import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../config/api";
import { toast } from "react-toastify";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const cart = localStorage.getItem("cart");
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/carts/${userId}`);
      setItems(res.data);
      localStorage.setItem("cart", JSON.stringify(res.data));
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async ({ productId, productQty = 1, userId }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/carts/add", { productId, productQty, userId });
      toast.success("Added to cart!");
      setItems((prev) => {
        const updated = [...prev, res.data];
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.response?.data || err.message);
      toast.error("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async ({ userId, productId }) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/carts/remove/${userId}/${productId}`);
      setItems((prev) => {
        const updated = prev.filter((item) => item.productId !== productId);
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.response?.data || err.message);
      toast.error("Failed to remove from cart.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCartQuantity = useCallback(
    async ({ productId, productQty, userId }) => {
      setLoading(true);
      setError(null);
      try {
        await api.put("/carts/update-qty", { productId, productQty, userId });
        setItems((prev) => {
          const updated = prev.map((item) =>
            item.productId === productId ? { ...item, productQty } : item
          );
          localStorage.setItem("cart", JSON.stringify(updated));
          return updated;
        });
        toast.success("Quantity updated!");
      } catch (err) {
        setError(err.response?.data || err.message);
        toast.error("Failed to update quantity.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const value = React.useMemo(() => ({
    items,
    loading,
    error,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  }), [items, loading, error, fetchCart, addToCart, removeFromCart, updateCartQuantity]);
  

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
