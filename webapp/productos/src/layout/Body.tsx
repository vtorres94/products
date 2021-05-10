import React from 'react'
import Products from './components/Products';

interface IBodyProps {}

const Body = (props: IBodyProps) => {
    return (
        <div>
            <Products/>
        </div>
    )
}

export default Body;