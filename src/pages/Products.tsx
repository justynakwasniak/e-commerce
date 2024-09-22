import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext"; // Importuj useCart

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart(); // Uzyskaj funkcję addToCart z kontekstu

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart} // Przekaż addToCart jako props
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
