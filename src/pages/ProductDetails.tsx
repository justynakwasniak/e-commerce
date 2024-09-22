import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/api";
import { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(parseInt(id)).then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <h3>${product.price}</h3>
    </div>
  );
};

export default ProductDetails;
