import React, { useEffect, useContext } from 'react'
import { Input, Segment, Item, Image, Header, Icon } from 'semantic-ui-react'
import { ProductoContext } from '../../context/productContext';
import { useUser } from 'reactfire';
import 'firebase/auth';

interface IProductsProps {}

const Products = (props: IProductsProps) => {

    const { productosList, obtenerProductos } = useContext(ProductoContext);

    const user = useUser();
    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
      <Segment textAlign="center">
        <Input placeholder="Search" />
        <Header>
          <Header.Content>Products</Header.Content>
          <Header.Subheader>{user.data ? user.data.email : 'No ha iniciado sesión'}</Header.Subheader>
        </Header>
        <Item.Group>
          <Item>
            <Item.Extra>Additional Details</Item.Extra>
          </Item>

          <Item>
            <Item.Image size="tiny" src="/images/wireframe/image.png" />

            <Item.Content>
              <Item.Header as="a">Header</Item.Header>
              <Item.Meta>Description</Item.Meta>
              <Item.Description>
                <Image src="/images/wireframe/short-paragraph.png" />
              </Item.Description>
              <Item.Extra>Additional Details</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    );
}

export default Products;