import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface ProductsListProps {
  products: Product[];
  onAddToCart: (product: Product & { quantity: number }) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onAddToCart,
}) => {
  const [sortOption, setSortOption] = useState<
    "alphabetical" | "price" | "none"
  >("none");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterOption] = useState<"all" | "lowPrice" | "highPrice">("all");

  const filteredProducts = products.filter((product) => {
    if (filterOption === "lowPrice") {
      return product.price < 50;
    } else if (filterOption === "highPrice") {
      return product.price >= 50;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let comparison = 0;
    if (sortOption === "alphabetical") {
      comparison = a.title.localeCompare(b.title);
    } else if (sortOption === "price") {
      comparison = a.price - b.price;
    }
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div>
      <div className="filter-options mb-5">
        {" "}
        <div className="row text-center">
          {" "}
          <div className="col">
            <label htmlFor="sortSelect">Sort by:</label>
            <select
              id="sortSelect"
              className="form-select"
              value={sortOption}
              onChange={(e) =>
                setSortOption(
                  e.target.value as "alphabetical" | "price" | "none"
                )
              }
            >
              <option value="none">Default</option>
              <option value="alphabetical">Alphabetically</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div className="col">
            <label htmlFor="sortDirection">Sort direction:</label>
            <select
              id="sortDirection"
              className="form-select"
              value={sortDirection}
              onChange={(e) =>
                setSortDirection(e.target.value as "asc" | "desc")
              }
            >
              <option value="asc">↑</option>
              <option value="desc">↓</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        {" "}
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div className="col-10 col-md-6 col-lg-4 mb-4" key={product.id}>
              {" "}
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
