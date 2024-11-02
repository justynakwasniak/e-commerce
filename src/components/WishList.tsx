import { useWishlist } from "../context/useWishlist";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="container">
      <h2 className="text-center">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-items d-flex flex-wrap justify-content-center">
          {" "}
          {/* Added classes for flexbox and centering */}
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="card mb-3 m-2" // Added margin for spacing between cards
              style={{ width: "15rem" }} /* Reduced width */
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  className="wishlist-img card-img-top" /* Added class */
                  alt={product.title}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
