"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "../types/item";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (itemId: string, quantity?: number) => Promise<void>;
  removeFromCart: (cartId: string) => Promise<void>;
  updateQuantity: (cartId: string, quantity: number) => Promise<void>;
  getCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const getCartItems = async () => {
  try {
    const res = await fetch("http://localhost:8000/cart/");
    const data = await res.json();
    setCartItems(data);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};

const addToCart = async (itemId: string, quantity: number = 1) => {
  try {
    await fetch("http://localhost:8000/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        quantity,
      }),
    });
    await getCartItems();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

  const removeFromCart = async (cartId: string) => {
    try {
      await fetch(`http://localhost:8000/cart/remove/${cartId}`, {
        method: "DELETE",
      });
      await getCartItems();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateQuantity = async (cartId: string, quantity: number) => {
    try {
      await fetch(`http://localhost:8000/cart/update/${cartId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });
      await getCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};