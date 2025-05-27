import { createContext, useState } from 'react';

export const CartContext = createContext({
  cart: [],
  total: 0,
  addToCart: (item: any) => {},
  removeFromCart: (itemId: any) => {},
});
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    setTotal((prevTotal) => prevTotal + item.price);
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    setTotal(
      (prevTotal) => prevTotal - cart.find((item) => item.id === itemId).price
    );
  };

  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
