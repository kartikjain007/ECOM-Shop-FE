import React from "react";
import ProductCard from "./ProductCard";

const CategoryList = ({ title, products, categoryId }) => (
  <section id={title.toLowerCase()} className="category-list">
    <h2>{title}</h2>
    <div className="horizontal-scroll">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          categoryId={categoryId}
        />
      ))}
    </div>
  </section>
);

export default CategoryList;
