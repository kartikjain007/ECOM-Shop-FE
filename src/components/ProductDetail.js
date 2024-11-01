import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import axios from "axios";

const ProductDetail = () => {
  const { categoryId, productId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios({
      url: `https://ecom-vercel-wheat.vercel.app/api/products/${productId}`,
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

  if (!product) return <p>Product not found</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout", { state: { product, quantity } });
  };

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description || "This is a great product!"}</p>
        <h3>Price: ${product.price}</h3>
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </label>
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
