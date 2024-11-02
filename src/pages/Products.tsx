import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart";
import { useLocation } from "react-router-dom"; // Import useLocation

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const location = useLocation(); // Use useLocation to read query parameters

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  // Read query parameters
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || ""; // Default values if none

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row d-flex justify-content-center g-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-10 col-md-6 col-lg-4" key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                style={{ maxWidth: "100%" }} // Keep the max width
              />
            </div>
          ))
        ) : (
          <div className="text-center">Loading ...</div> // Message if no products
        )}
      </div>
    </div>
  );
};

export default Products;
