import React, { useContext } from "react";
import "./Cart.css";
import CartContext from "../../Context/CartContext";

export default function Cart() {

  const { handleQuantityChange, cart, cartVisible, toggleCart } = useContext(CartContext);
  const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className={`CartContainer ${cartVisible ? "visible" : ""}`}>
      <div className="CartContent">
        <div className="closeCartSection">
          <h3>Cart</h3>
          <button className="closeCartBtn" onClick={toggleCart}>
            <i className="fa fa-close"></i>
          </button>
        </div>
        {cart.map((cartItem) => (
          <div className="cardItem" key={cartItem.id}>
            <div className="imageCartContainer">
              <img src={cartItem.image} alt="cartIcon" />
            </div>
            <div className="productCartInfo">
              <h2 className="cartProductTitle">{cartItem.title}</h2>
              <div className="cartProductPrice">{cartItem.price * cartItem.quantity} $</div>
              <div className="quantityCartSection">
                <p>
                  Quantity:
                  <button onClick={() => handleQuantityChange(cartItem, -1)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => handleQuantityChange(cartItem, 1)}>+</button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="totalCost">
        <h3>Total Cost: <span>{totalCost} $</span></h3>
        <button onClick={() => { alert("Bought!") }}>Buy</button>
      </div>
    </div>
  );
}
