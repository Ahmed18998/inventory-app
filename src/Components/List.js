import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, editProduct } from "../store/Actions/action-creator";

const List = (props) => {
  const { id, product, quantity, price } = props;
  const loading = useSelector((state) => state.Inventory.loading);
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);

  const [currentProductName, setCurrentName] = useState(product);
  const [currentProductQuantity, setCurrentQuantity] = useState(quantity);
  const [currentProductPrice, setCurrentPrice] = useState(price);

  // handle change product name
  const handleChangeName = (e) => {
    setCurrentName(e.target.value);
  };

  // handle change product quantity
  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setCurrentQuantity(parseInt(value));
    } else {
      return;
    }
  };

  // handle change product price
  const handleChangePrice = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setCurrentPrice(parseInt(value));
    } else {
      return;
    }
  };

  // edit product function with dispatch function editProduct() to action creator and setEdit() to render product again
  const handle__edit__product = (product, quantity, price, id) => {
    dispatch(editProduct(product, quantity, price, id));
    setEdit(!isEdit);
  };

  // render form
  const renderEditForm = () => {
    return (
      <>
        <form className="edit__form" id="edit__form"></form>
        <tr>
          <td>{id}</td>
          <td>
            <input
              type="text"
              form="edit__form"
              defaultValue={product}
              onChange={handleChangeName}
            />
          </td>
          <td>
            <input
              type="number"
              form="edit__form"
              defaultValue={quantity}
              onChange={handleChangeQuantity}
            />
          </td>
          <td>
            <input
              type="number"
              form="edit__form"
              defaultValue={price}
              onChange={handleChangePrice}
            />
          </td>
          <td>
            <button
              className="primary"
              onClick={() =>
                handle__edit__product(
                  currentProductName,
                  currentProductQuantity,
                  currentProductPrice,
                  id
                )
              }
            >
              Edit
            </button>
          </td>
        </tr>
      </>
    );
  };

  // handle edit function to render form
  const handleEdit = () => {
    setEdit(!isEdit);
    renderEditForm();
  };

  // handle delete product function
  const handleDelete = (id) => {
    setTimeout(() => {
      const deleteSure = window.confirm("Are you sure 🤔");
      if (deleteSure === true) {
        dispatch(deleteProduct(id));
      }
    }, 500);
  };

  // render inventory
  const renderInventory = () => {
    return (
      <tr>
        <td>{id}</td>
        <td>{product}</td>
        <td>{quantity}</td>
        <td>{price} $</td>
        <td>
          <button className="danger" onClick={() => handleDelete(id)}>
            Delete
          </button>
          <button className="primary" onClick={() => handleEdit()}>
            Edit
          </button>
        </td>
      </tr>
    );
  };

  if (loading) {
    return <p>loading ...</p>;
  } else return <>{isEdit ? renderEditForm() : renderInventory()}</>;
};

export default List;
