import axios from "axios";
import {
  GET_PRODUCTS,
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  EDIT_PRODUCTS,
} from "./action-type";

// api url
const apiUrl = "http://localhost:3000/Inventory";

// get product function
export const getProducts = () => {
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then((res) => dispatch({ type: GET_PRODUCTS, payload: res.data }));
  };
};

// add product function with using dispatch function to send type and payload to reducer
export const addProduct = (product, quantity, price) => {
  return (dispatch) => {
    axios.post(apiUrl, { product, quantity, price }).then((res) =>
      dispatch({
        type: ADD_PRODUCTS,
        product,
        quantity,
        price,
        id: res.data.id,
      })
    );
  };
};

// delete product function with using dispatch function to send type and payload to reducer
export const deleteProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3000/Inventory/${id}`)
      .then((res) => dispatch({ type: DELETE_PRODUCTS, id }));
  };
};

// edit product function with using dispatch function to send type and payload to reducer
export const editProduct = (product, quantity, price, id) => {
  return (dispatch) => {
    axios
      .patch(`http://localhost:3000/Inventory/${id}`, {
        product,
        quantity,
        price,
      })
      .then((res) =>
        dispatch({
          type: EDIT_PRODUCTS,
          product,
          quantity,
          price,
          id,
        })
      );
  };
};
