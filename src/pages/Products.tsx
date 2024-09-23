import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            {" "}
            {/* 4 kolumny w rzędzie na medium i większych ekranach */}
            <ProductCard
              product={product}
              onAddToCart={addToCart}
              style={{ maxWidth: "100%" }} // Ustawienia stylu dla karty
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
