import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import "../index.css";

const CartPage = () => {
  const { cartItems, updateCartQuantity, removeFromCart, getTotalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const totalAmount = getTotalPrice();
    navigate("/checkout", { state: { cartItems, totalAmount } });
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-checkout">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateCartQuantity(item._id, parseInt(e.target.value))
                    }
                  />
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="total-price">
            <h3>Total Price: ${getTotalPrice()}</h3>
            <button onClick={handleCheckout} className="checkout">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
