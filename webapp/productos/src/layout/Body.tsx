import React from 'react'
import Products from './product-components/Products';
import { ProductoContextProvider } from './../context/productContext';
interface IBodyProps {}

const Body = (props: IBodyProps) => {
    return (
        <div>
        <ProductoContextProvider>

            <Products/>
        </ProductoContextProvider>

        </div>
    )
}

export default Body;