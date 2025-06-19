// ItemCount.jsx
import React, { useContext, useState } from 'react';
import { cartContext } from '../context/CartContext';

const ItemCount = ({ stock = 10, initial = 1, producto }) => {
  const [count, setCount] = useState(initial);
  const { addToCart } = useContext(cartContext);
  const { removeFromCart } = useContext(cartContext);
  const increment = () => {
    if (count < stock) setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAddToCart = () => {
    // Agrega el producto y la cantidad seleccionada
    addToCart(producto, count);
  };

  const handleRemoveToCart = () => {
    removeFromCart(producto.id);
  };

  return (
    <div>
      <button onClick={handleRemoveToCart}>Quitar</button>
      <button onClick={decrement} disabled={count <= 1}>
        -
      </button>
      <span>{count}</span>
      <button onClick={increment} disabled={count >= stock}>
        +
      </button>
      <button onClick={handleAddToCart}>Agregar</button>
    </div>
  );
};

export default ItemCount;
