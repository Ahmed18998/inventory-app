import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addProduct } from "../store/Actions/action-creator";
import List from "./List";
const Inventory = () => {
  const inventory = useSelector((state) => state.Inventory.Inventory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const [currentProductName, setCurrentName] = useState("");
  const [currentProductQuantity, setCurrentQuantity] = useState(0);
  const [currentProductPrice, setCurrentPrice] = useState(0);

  // handle change product name function

  const handleChangeName = (e) => {
    setCurrentName(e.target.value);
  };

  // handle change product quantity function

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setCurrentQuantity(parseInt(value));
    } else {
      return;
    }
  };

  // handle change product price function
  const handleChangePrice = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setCurrentPrice(parseInt(value));
    } else {
      return;
    }
  };

  // valid string function
  const validString = (text) => {
    if (text === "") {
      window.confirm("Product name is required");
    } else return true;
  };

  // valid number function
  const validNum = (num) => {
    if (isNaN(num) || num === "") {
      if (num === currentProductQuantity) {
        window.confirm("Product quantity is required and must be a number");
      } else if (num === currentProductPrice) {
        window.confirm("Product price is required and must be a number");
      }
    } else if (num === 0) {
      if (num === currentProductQuantity) {
        window.confirm("Product quantity it should have a count");
      } else if (num === currentProductPrice) {
        window.confirm("Product price it should have a count");
      }
    } else {
      return true;
    }
  };

  // add product function
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (validString(currentProductName)) {
      if (validNum(currentProductQuantity) && validNum(currentProductPrice)) {
        dispatch(
          addProduct(
            currentProductName,
            currentProductQuantity,
            currentProductPrice
          )
        );
      }
    }
    setCurrentName("");
    setCurrentQuantity(0);
    setCurrentPrice(0);
  };

  // render form
  const renderInputs = () => {
    return (
      <>
        <form className="add__form" onSubmit={handleAddProduct}>
          <label htmlFor="name">Product Name : </label>
          <input
            type="text"
            id="name"
            placeholder="Your product name"
            onChange={handleChangeName}
            value={currentProductName}
          />
          <label htmlFor="quantity">Product Quantity : </label>
          <input
            type="number"
            id="quantity"
            placeholder="Your product quantity"
            onChange={handleChangeQuantity}
            value={currentProductQuantity}
          />
          <label htmlFor="price">Product Price : </label>
          <input
            type="number"
            id="price"
            placeholder="Your Product price"
            onChange={handleChangePrice}
            value={currentProductPrice}
          />
          <button className="primary">Add</button>
        </form>
      </>
    );
  };

  // render inventory
  const renderInventory = () => {
    return Object.keys(inventory).map((obj) => (
      <List
        key={obj}
        product={inventory[obj].product}
        quantity={inventory[obj].quantity}
        price={inventory[obj].price}
        id={inventory[obj].id}
      />
    ));
  };

  return (
    <>
      {renderInputs()}
      <div className="content">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Quantity</th>
              <th>Product Price</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{renderInventory()}</tbody>
        </table>
      </div>
    </>
  );
};

export default Inventory;
