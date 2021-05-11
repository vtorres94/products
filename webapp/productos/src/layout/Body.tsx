import React from 'react'
import Products from './product-components/Products';
import '../css/Body.css';
import { RouteComponentProps } from 'react-router-dom';

interface IBodyProps extends RouteComponentProps<{ url: string }>{}

const Body = (props: IBodyProps) => {
    return (
        <Products/>
    )
}

export default Body;