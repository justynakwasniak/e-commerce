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
  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  return (
    <div className="container">
      {/* Dodajemy klasę g-4, aby dodać odstęp między kolumnami */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={addToCart}
              style={{ maxWidth: "100%", margin: "0 15px" }} // Dodatkowy styl marginesu
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
