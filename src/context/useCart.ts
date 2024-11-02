// useCart.tsx
import { useContext } from "react";
import CartContext, { CartContextType } from "./CartContext";

export const useCart = () => {
  const context = useContext<CartContextType | undefined>(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
