import React, { Component } from 'react';
import './style.css';
import api from '../../services/api';


export default class Product extends Component{

    state = {
        produto: {}
    };

    async componentDidMount(){
        /* Pegar a ID da rota */
        const { id } = this.props.match.params;

        const response = await api.get(`/products/${id}`);
        console.log(response);

        this.setState({ produto:response.data });
    };

    render(){

        const { produto } = this.state;
        console.log(produto);
        

        return( 
            <div className="product-info">
               <h1>{produto.title}</h1>
                <p>{produto.description}</p>
                <p>
                    URL: <a href={produto.url}>{produto.url}</a>
                </p>
            </div>
        );
    }
}
