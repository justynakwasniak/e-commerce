import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/useCart";
import { useLocation } from "react-router-dom"; // Dodaj import

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const location = useLocation(); // Użyj useLocation do odczytania parametrów zapytania

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  // Odczytaj parametry zapytania
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || ""; // Domyślne wartości jeśli brak

  // Filtrowanie produktów
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Kontener d-flex i justify-content-center dla wyśrodkowania */}
      <div className="row d-flex justify-content-center g-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-12 col-md-6 col-lg-4" key={product.id}>
              {" "}
              {/* Responsywna kolumna */}
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                style={{ maxWidth: "100%" }} // Pozostaw maksymalną szerokość
              />
            </div>
          ))
        ) : (
          <div className="text-center">No products found.</div> // Informacja, jeśli brak produktów
        )}
      </div>
    </div>
  );
};

export default Products;
