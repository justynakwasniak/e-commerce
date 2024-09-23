import React from "react";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { quantity: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div
      className="card mb-4"
      style={{
        width: "18rem",
        height: "350px",
        backgroundColor: "var(--primary-gray)",
      }}
    >
      <img
        src={product.image}
        className="card-img-top"
        alt={product.title}
        style={{
          height: "150px",
          objectFit: "contain",
          width: "100%",
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5
          className="card-title"
          style={{
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxHeight: "1.2em",
            lineHeight: "1.2em",
          }}
        >
          {product.title.length > 50
            ? `${product.title.substring(0, 50)}...`
            : product.title}
        </h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart({ ...product, quantity: 1 })}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
