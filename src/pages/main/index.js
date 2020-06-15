import React, { Component } from 'react'
import api from '../../services/api'
import './styles.css'
import { Link } from 'react-router-dom';

export default class Main extends Component {
    
    /**Variável de estado, nela consigo armazenar 
     * as variávies que quiser
     **/
    state = {
        products:[],
        productInfo:{},
        page: 1,

    }
    /** 
     * Método executado assim que é mostrado 
     * em tela
    **/
    componentDidMount(){
        this.loadProducts();
    }

    /** Consultar a API */
    loadProducts = async (page = 1) =>{
                                                    
        const response = await api.get(`/products?_page=${page}&_limit=2`);

        const responseInfo = await api.get(`/productInfo`);
     
        const productInfo = responseInfo.data;
        //console.log(responseInfo);

        const docs = response.data;
        
        //Atualizandoas variaveis de estado  - (Preciso atualizar a variavel page no estado!)
        this.setState({ products:docs, productInfo, page});
    }

    /*render(){
        return <h1>Contagem de Produtos: { this.state.products.length } </h1>
    }*/

    prevPage = () =>{

        /** faço a busca das variaveis no state*/
        const { page } = this.state;

        //verifica se esta na primeira página e não faz nada
        if(page === 1) return;

        const pageNumber = page - 1;
        //estou passando o novo valor para 
        this.loadProducts(pageNumber);

    } 

    nextPage = () =>{
        /** faço a busca das variaveis no state*/
        const { page, productInfo } = this.state;

        //verifica se esta na ultima página e não faz nada
        if(page === productInfo.pages) return;

        //console.log(productInfo.pages);

        const pageNumber = page + 1;
        //estou passando o novo valor para 
        this.loadProducts(pageNumber);
    }

    render(){

        /* Pegando os valores de state das variaveis*/
        const { products, page, productInfo } = this.state;
        //console.log(productInfo.pages); 

        return(
            <div className="product-list">
                {products.map(product => (
                    <article key={product.id}>
                       <strong>{product.title}</strong>
                       <p>{product.description}</p>

                       <Link to={`/products/${product.id}`}>Acessar</Link>
                    </article>                    
                ))}
                 <div className="actions">
                    <button disabled={page === 1} onClick={ this.prevPage }>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={ this.nextPage }>Próxima</button>
                 </div>
            </div>
           
        )
    }

    /**
     * Porque estou usando métodos diferentes?
     * > Funciton => Usada quando são métodos que 
     *   pertencem ao React
     * 
     * > Arrow Function => Usado quando são métodos 
     *   da aplicação (Desta forma enxergamos o escopo
     *   da variável This)
     **/
}