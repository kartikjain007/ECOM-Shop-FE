import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";
import "../index.css";

const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios({
      url: `${process.env.REACT_APP_BASE_URL}/products/${productId}`,
      method: "GET",
    })
      .then((res) => {
        let data = res.data;
        setProduct(data);
      })
      .catch((err) => {
        console.log(err);
        setProduct(null);
      });
  }, [categoryId, productId]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
    }
  }, [addToCart, product, quantity]);

  if (!product) return <p>Product not found</p>;

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout", { state: { product, quantity } });
  };

  return (
    <div className="product-detail">
      <div className="product-image">
        <img
          className="product-images"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description || "This is a great product!"}</p>
        <h3>Price: ${product.price}</h3>
        <div className="quantity-section">
          <label className="quantity-label">Quantity:</label>
          <input
            className="quantity-input"
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <div className="actions">
          <button className="buy-now" onClick={handleBuyNow}>
            Buy Now
          </button>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
