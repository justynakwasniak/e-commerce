import { useContext } from "react";
import CartContext from "./CartContext";

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { setCart } = context; // Pobierz setCart z kontekstu

  // Funkcja do czyszczenia koszyka
  const clearCart = () => setCart([]);

  return {
    ...context, // Zwraca resztę wartości z kontekstu
    clearCart, // Dodaje clearCart do zwracanego obiektu
  };
};
