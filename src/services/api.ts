import { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
};
