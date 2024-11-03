import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductsList from "../components/ProductsList";
import { useCart } from "../context/useCart";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  // Read query parameters for search filtering
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <ProductsList products={filteredProducts} onAddToCart={addToCart} />
    </div>
  );
};

export default Products;
