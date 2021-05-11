import React, { useEffect, useState } from 'react'
import { Input, Segment, Item, Image, Header } from 'semantic-ui-react'
import { useUser, useFirebaseApp } from 'reactfire';
import IProducto from './../../model/product.model';
interface IProductsProps {}

interface IProductsState {
  productsList: IProducto[],
  product: IProducto
}
const Products = (props: IProductsProps) => {

    const user = useUser();
    const [state, setState] = useState<IProductsState>({
      productsList: [],
      product: {}
    })

    const [productsList, setProductsList] = useState<IProducto[]>();
    const firebase = useFirebaseApp();

    useEffect(() => {
      getProducts()
    }, []);

    const getProducts = async() => {
      await setState({ ...state, productsList: []})
      const dbRef = firebase.database().ref("products");
      await dbRef.on('value', (snapshot) => {
        const prod = snapshot.val();
        const prodList = []
        for(let id in prod) {
          prodList.push({
            "product" : prod[id].product,
            "category": prod[id].category,
            "description": prod[id].description,
            "imageBase64": prod[id].imageBase64
          });
          console.log(prod[id].product)
        }
        setProductsList(prodList)
      })
    }

    return (
      <Segment textAlign="center">
        <Input placeholder="Search" />
        <Header>
          <Header.Content>Products</Header.Content>
          <Header.Subheader>{user.data ? user.data.email : 'No ha iniciado sesión'}</Header.Subheader>
        </Header>
        <Segment className={"products-container"}>
          <Item.Group divided>
            {productsList ? productsList.map(products => {
              return (
            <Item size="tiny">
              <Item.Image size="tiny" src={'data:image/jpeg;base64,'+products?.imageBase64} />
              <Item.Content >
                <Item.Header as="a">{products?.product}</Item.Header>
                <Item.Meta>{products?.category}</Item.Meta>
                <Item.Description>
                  {products?.description}
                </Item.Description>
              </Item.Content>
            </Item>
              )
            }): null}
          </Item.Group>
        </Segment>
      </Segment>
    );
}

export default Products;