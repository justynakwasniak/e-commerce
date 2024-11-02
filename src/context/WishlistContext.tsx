// context/WishlistContext.tsx
import React, { createContext, useState } from "react";
import { Product } from "../types/product";

interface WishlistContextProps {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
}

export const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = (product: Product) => {
    // Check if the product is already in the wishlist
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
