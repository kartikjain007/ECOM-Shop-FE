import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, categoryId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${categoryId}/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <img className="product-image" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
};

export default ProductCard;
