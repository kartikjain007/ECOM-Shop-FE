import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import AuthPopup from "./AuthPopup";
import { useLogin } from "../contexts/LoginContext";
import "../index.css";

const Header = () => {
  const { cartItems } = useCart();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { username, authenticated, handleLogin } = useLogin();

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleLoginClick = () => {
    setIsLoginMode(true);
    setShowPopup(true);
  };

  const handleSignupClick = () => {
    setIsLoginMode(false);
    setShowPopup(true);
  };

  const handleLogout = () => {
    handleLogin(false, "", "");
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <header className="header">
      <h1 className="logo-name">ECom Website</h1>
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
            <div className="username" style={{ margin: "0px 10px" }}>
              Hey, {username}!
            </div>
            <Link onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link onClick={handleLoginClick}>Login</Link>
            <Link onClick={handleSignupClick}>Signup</Link>
          </>
        )}
      </nav>

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
