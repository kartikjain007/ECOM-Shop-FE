import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import axios from "axios";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios({
      url: "https://ecom-vercel-wheat.vercel.app/api/categories",
      method: "GET",
    })
      .then((res) => {
        let data = res.data;
        setCategories(data || []);
        setSelectedCategory(data[0]);
      })
      .catch((err) => {
        console.log(err);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios({
        url: `https://ecom-vercel-wheat.vercel.app/api/products/category/${selectedCategory._id}`,
        method: "GET",
      })
        .then((res) => {
          let data = res.data;
          setProducts(data || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedCategory]);

  return (
    <div className="homepage">
      {/* Banner Section */}
      <div className="banner">
        <h1>Welcome to Our Shopping Site</h1>
      </div>

      {/* Category Tabs */}
      <div className="tabs">
        {categories.map((cat) => (
          <button
            className={cat._id === selectedCategory._id ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
            key={cat._id}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Display Selected Category */}
      <div className="category-content">
        <CategoryList
          title={selectedCategory?.name || ""}
          products={products}
          categoryId={selectedCategory?._id || ""}
        />
      </div>
    </div>
  );
};

export default Homepage;
