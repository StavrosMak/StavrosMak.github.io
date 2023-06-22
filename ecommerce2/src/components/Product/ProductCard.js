import React from "react";
import "./ProductCard.css"
import { motion } from 'framer-motion'
import  { useContext } from 'react';
import CartContext from "../../Context/CartContext";

export default function ProductCard({  product }) {
  const { handleAddToCart } = useContext(CartContext);

  return (
    <motion.div layout className="productCard" key={product.id}>
      <div className="productImg">
        <img loading="lazy" src={product.image} alt="productImage" />
      </div>

      <div className="productInfo">
        <div className="productTitle">{product.title}</div>
        <div className="productPrice">{product.price}$</div>
      </div>
      <div className="addToCart">
        <button onClick={() => handleAddToCart(product)}>Add to cart</button>
      </div>
    </motion.div>
  );
}
