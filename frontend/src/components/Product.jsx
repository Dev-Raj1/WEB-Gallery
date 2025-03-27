import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import Styles from "../components/Product.module.css";

function Product({ newProduct, showActions }) {
  const [items, setItems] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setItems(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [API_URL]);

  useEffect(() => {
    if (newProduct) {
      setItems((prevItems) => [newProduct, ...prevItems]);
    }
  }, [newProduct]);

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log("Product removed:", response.data);

      // Remove the product from the state list
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
      console.log("Product updated:", response.data);
  
      // Update the product in the state list
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, ...updatedProduct } : item
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
   
  };

  return (
    <div id={Styles.productContainer}>
      {items.length > 0 ? (
        items.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            title={item.name}
            imgURL={item.image}
            price={item.price}
            actions={showActions}
            onRemove={() => removeProduct(item._id)}
            onUpdate={(updatedProduct) => updateProduct(item._id, updatedProduct)}
          />
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default Product;
