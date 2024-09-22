import React from "react";
import { Product } from "../types/product"; // Importuj interfejs Product

interface ProductCardProps {
  product: Product; // Typ produktu
  onAddToCart: (product: Product & { quantity: number }) => void; // Typ funkcji onAddToCart
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      <img src={product.image} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        <button
          className="btn btn-primary"
          onClick={() => onAddToCart({ ...product, quantity: 1 })} // Dodaj do koszyka
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
