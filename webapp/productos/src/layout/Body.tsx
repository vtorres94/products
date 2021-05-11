import React from 'react'
import Products from './product-components/Products';
import '../css/Body.css';

interface IBodyProps {}

const Body = (props: IBodyProps) => {
    return (
        <Products/>
    )
}

export default Body;