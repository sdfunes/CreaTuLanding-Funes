import { createContext, useState } from 'react';

export const cartContext = createContext({
  cart: [],
  total: 0,
  addToCart: (item: any, quantity: number) => {},
  removeFromCart: (itemId: any) => {},
  clearCart: () => {},
});
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);

  const addToCart = (item, quantity = 1) => {
    setCart((prevCart) => [
      ...prevCart,
      ...Array.from({ length: quantity }, () => ({ ...item, quantity: 1 })),
    ]);
    setTotal((prevTotal) => prevTotal + item.price * quantity);
    setCartItemCount((prevCount) => prevCount + quantity);
  };

  const removeFromCart = (itemId) => {
    const itemToRemove = cart.find((item) => item.id === itemId);
    if (!itemToRemove) return;

    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setTotal(
      (prevTotal) => prevTotal - itemToRemove.price * itemToRemove.quantity
    );
    setCartItemCount((prevCount) => prevCount - itemToRemove.quantity);
  };

  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setCartItemCount(0);
  };

  return (
    <cartContext.Provider
      value={{ cart, total, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </cartContext.Provider>
  );
};
