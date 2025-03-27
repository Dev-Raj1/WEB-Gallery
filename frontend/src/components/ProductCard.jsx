import React, { useState } from "react";
import Styles from "../components/ProductCard.module.css";
import Modal from "./Modal";

const ProductCard = ({ id, title, price, imgURL, actions = false, onRemove, onUpdate }) => {
  const [showUpdateModal, setUpdateModal] = useState(false);

  const handleUpdate = () => {
    setUpdateModal(!showUpdateModal);
    
  };

  const handleModalSubmit = ( updatedProduct) => {
    onUpdate(updatedProduct); // Pass the updated product to the parent
    setUpdateModal(false); // Close the modal
  };

  return (
    <>
      <div id={Styles.product_container}>
        <div>
          <img id={Styles.image} src={imgURL} alt="Error" />
          <h2>{title}</h2>
          <span>${price}</span>
        </div>

        {showUpdateModal && (
          <Modal
            product={{ title, price, imgURL }}
            onClose={handleUpdate}
            onSubmit={handleModalSubmit} // Pass the updated product to the parent
          />
        )}
        <div>
          {actions && (
            <>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={onRemove}>Remove</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;