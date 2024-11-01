import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useLogin } from "../contexts/LoginContext";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { authenticated } = useLogin();
  const { product, quantity, cartItems, totalAmount } = location.state || {};
  const isSingleProduct = Boolean(product && quantity);
  const items = isSingleProduct ? [{ ...product, quantity }] : cartItems;
  const totalPrice = isSingleProduct ? product.price * quantity : totalAmount;

  const handlePayment = () => {
    if (authenticated) {
      alert(`Payment of $${totalPrice} successful!`);
      if (!isSingleProduct) {
        clearCart();
      }
      navigate("/"); // Redirect to homepage after payment
    } else {
      alert("Please login in your account before proceeding to payment!");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {items && items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <div key={index} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
          <h3>Total Price: ${totalPrice}</h3>
          <button onClick={handlePayment} className="payment-button">
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p>No items to checkout</p>
      )}
    </div>
  );
};

export default CheckoutPage;
