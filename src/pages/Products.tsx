import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
