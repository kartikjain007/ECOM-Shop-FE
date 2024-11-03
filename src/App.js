import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import ProductDetail from "./components/ProductDetail";
import CartPage from "./components/CartPage";
import { CartProvider } from "./contexts/CartContext";
import CheckoutPage from "./components/CheckoutPage";
import "./App.css";
import Header from "./components/Header";
import { LoginProvider } from "./contexts/LoginContext";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <LoginProvider>
        <CartProvider>
          <Router>
            <Header />
            <div className="App">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                  path="/product/:categoryId/:productId"
                  element={<ProductDetail />}
                />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </LoginProvider>
      <Footer />
    </div>
  );
}

export default App;
