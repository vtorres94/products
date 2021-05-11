import React, { createContext, useReducer } from 'react';
import ProductoReducer from '../layout/product-components/ProductReducer';

import Axios from 'axios';
import Swal from 'sweetalert2'

import { ELIMINAR_PRODUCTO, MODIFICAR_PRODUCTO, OBTENER_PRODUCTO, OBTENER_PRODUCTOS, REGISTRAR_PRODUCTO } from '../const/actionTypes';

export const ProductoContext = createContext();

export const ProductoContextProvider = props => {

  const initialState = {
    productosList: [],
    productoActual: null,
    loading: true,
  }

  const [state, dispatch] = useReducer(ProductoReducer, initialState);

  const obtenerProductos = async () => {
    try {
      const resultado = await Axios.get("http://localhost:3030/products");
      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: resultado.data
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener los productos',
        toast: true
      });
      console.log(error);
    }
  }

  const registrarProducto = async producto => {
    try {
      const resultado = await Axios.post('/products', producto);
      dispatch({
        type: REGISTRAR_PRODUCTO,
        payload: resultado.data
      })
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Producto registrado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el producto',
        toast: true
      });
      console.log(error);
    }
  }
  
  const obtenerProducto = async producto => {
    try {
      let productoEncontrado = null;
      if(producto !== null) {
        const resultado = await Axios.get(`/products/${producto.idProducto}`);
        productoEncontrado = resultado.data;
      } else {
        productoEncontrado = producto;
      }

      dispatch({
        type: OBTENER_PRODUCTO,
        payload: productoEncontrado
      })

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo obtener el producto',
        toast: true
      });
      console.log(error);
    }
  }

  const actualizarProducto = async producto => {
    try {
      const resultado = await Axios.put(`/products`, producto);
        
      dispatch({
        type: MODIFICAR_PRODUCTO,
        payload: resultado.data,
      })

      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Producto modificado correctamente.',
        toast: true
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo modificar el producto',
        toast: true
      });
      console.log(error);
    }
  }

  const eliminarProducto = async idProducto => {
    try {

      Swal.fire({
        title: '¿Desea continuar?',
        text: 'Se eliminará el producto seleccionado',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar'
      }).then(async (result) => {
        if(result.value) {
          await Axios.delete(`/products/${idProducto}`);
          
          dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: idProducto
          })
          
          Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Producto eliminado correctamente.',
            toast: true
          });
        }
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el producto',
        toast: true
      });
      console.log(error);
    }
  }

  return (
    <ProductoContext.Provider
      value={{
        productosList: state.productosList,
        productoActual: state.productoActual,

        obtenerProductos,
        registrarProducto,
        obtenerProducto,
        actualizarProducto,
        eliminarProducto,
      }}
    >
      {props.children}
    </ProductoContext.Provider>
  )
}