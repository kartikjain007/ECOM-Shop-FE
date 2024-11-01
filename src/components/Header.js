import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import AuthPopup from "./AuthPopup"; // Import AuthPopup component
import { useLogin } from "../contexts/LoginContext";

const Header = () => {
  const { cartItems } = useCart();
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const [isLoginMode, setIsLoginMode] = useState(true); // Track if login or signup is needed
  const { username, authenticated, handleLogin } = useLogin();

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleLoginClick = () => {
    setIsLoginMode(true); // Set mode to login
    setShowPopup(true); // Show popup
  };

  const handleSignupClick = () => {
    setIsLoginMode(false); // Set mode to signup
    setShowPopup(true); // Show popup
  };

  const handleLogout = () => {
    handleLogin(false, "", "");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <header className="header">
      <h1>Shopping Website</h1>
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center ",
        }}
      >
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-button">
          Cart ({cartCount})
        </Link>
        {authenticated ? (
          <>
            <div style={{ margin: "0px 10px" }}>Hey, {username}!</div>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link onClick={handleLoginClick}>Login</Link>
            <Link onClick={handleSignupClick}>Signup</Link>
          </>
        )}
      </nav>
      {/* Show AuthPopup when showPopup is true */}
      {showPopup && (
        <AuthPopup
          closePopup={closePopup}
          isLoginMode={isLoginMode}
          handleLogin={handleLogin}
        />
      )}
    </header>
  );
};

export default Header;
