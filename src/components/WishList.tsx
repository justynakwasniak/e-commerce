import { useWishlist } from "../context/useWishlist";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart";

const Wishlist = () => {
  const { wishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="container">
      <h2 className="text-center">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-items d-flex flex-wrap justify-content-center">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              isWishlistPage={true}
              style={{ width: "15rem", margin: "1rem" }}
            />
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
