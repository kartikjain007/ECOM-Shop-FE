import React, { useState } from "react";
import axios from "axios";

const AuthPopup = ({ closePopup, isLoginMode, handleLogin }) => {
  const [isLogin, setIsLogin] = useState(isLoginMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password, ...(isLogin ? {} : { name }) };
    axios({
      url: isLogin
        ? "https://ecom-vercel-wheat.vercel.app/api/Auth/login"
        : "https://ecom-vercel-wheat.vercel.app/api/Auth/signup",
      method: "POST",
      data: data,
    })
      .then((res) => {
        let data = res.data;
        handleLogin(true, data.user_name, data.user_id);
        closePopup(); // Close the popup after redirect
      })
      .catch((err) => {
        handleLogin(false);
        console.log(err);
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-btn" onClick={closePopup}>
          X
        </button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign Up" : "Have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
