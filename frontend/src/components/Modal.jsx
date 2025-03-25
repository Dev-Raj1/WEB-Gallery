import React, { useState } from "react";
import ReactDOM from "react-dom";
import Styles from "./Modal.module.css";

const Modal = ({ product, onSubmit, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    _id: product._id, // Include the product ID for updates
    name: product.title,
    price: product.price,
    image: product.imgURL,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedProduct); // Pass the updated product to the parent
    onClose(); // Close the modal after submit
  };

  return ReactDOM.createPortal(
    <div className={Styles.modalWrapper}>
      <div className={Styles.modalOverlay} onClick={onClose}></div>
      <div className={Styles.modalContainer}>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="ItemName">
            Product Name
            <input
              type="text"
              id="ItemName"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
              required
              placeholder="Enter product name"
            />
          </label>

          <label htmlFor="ItemPrice">
            Product Price
            <input
              type="number"
              id="ItemPrice"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
              required
              placeholder="Enter product price"
            />
          </label>

          <label htmlFor="ItemImage">
            Product Image URL
            <input
              type="text"
              id="ItemImage"
              name="image"
              value={updatedProduct.image}
              onChange={handleInputChange}
              required
              placeholder="Enter product image URL"
            />
          </label>

          <div>
            <button type="submit">Update Product</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-overlay")
  );
};

export default Modal;