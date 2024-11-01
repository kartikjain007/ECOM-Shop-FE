import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

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
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, idx) => (
            <div key={idx} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateCartQuantity(
                        item.uniqueId,
                        parseInt(e.target.value)
                      )
                    }
                  />
                </label>
                <button onClick={() => removeFromCart(item.uniqueId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total Price: ${getTotalPrice()}</h3>
          <button onClick={handleCheckout} className="checkout">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
