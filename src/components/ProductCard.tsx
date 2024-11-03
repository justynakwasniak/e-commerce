import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/useWishlist";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product & { quantity: number }) => void;
  style?: React.CSSProperties;
  isWishlistPage?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  style,
  isWishlistPage = false,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    onAddToCart({ ...product, quantity: 1 });
    setAddedToCart(true);

    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className="card mb-4 position-relative"
      style={{
        width: "18rem",
        height: "350px",
        backgroundColor: "var(--primary-gray)",
        ...style,
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

      <FontAwesomeIcon
        icon={isWishlistPage ? faTrash : faHeart}
        className="heart position-absolute top-0 end-0 p-2"
        style={{
          color: isWishlistPage || !isWishlisted ? "#39a78d" : "#D9534F",
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
        onClick={handleWishlistClick}
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
