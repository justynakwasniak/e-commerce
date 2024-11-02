// ProductCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { quantity: number }) => void; // Dodaj ten prop
  style?: React.CSSProperties;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  style,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity: 1 });
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <div
      className="card mb-4"
      style={{
        width: "18rem",
        height: "350px",
        backgroundColor: "var(--primary-gray)",
        ...style, // Użyj prop style
      }}
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          style={{ height: "150px", objectFit: "contain", width: "100%" }}
        />
      </Link>

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

        <button className="btn btn-add" onClick={handleAddToCart}>
          Add to cart
        </button>

        {addedToCart && (
          <div className="alert mt-2" role="alert">
            Product added to cart!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
