import React, { useState } from "react";
import Styles from "./Create.module.css";
import Product from "../components/Product";
import axios from "axios";


function Create() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [newProduct, setNewProduct] = useState(null); // Track new product for UI update

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, product);
      console.log("Product Created:", response.data);
      setNewProduct(response.data.data); // Update state with new product
      setProduct({ name: "", price: "", image: "" }); // Clear form
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div id={Styles.createContainer}>
        <h1>Create Product</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleInputChange}
              required
              placeholder="Enter image URL"
            />
          </div>

          <button id={Styles.submitBtn} type="submit">Create</button>
        </form>

        {/* Pass newProduct to Product component */}
        <Product showActions={true} newProduct={newProduct} />
      </div>
    </>
  );
}

export default Create;