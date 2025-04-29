import React, { useState } from 'react';

function CarShop() {
  const [cart, setCart] = useState([]);
  const remes = [
    { id: 1, name: 'Remera 1', price: '$20,000', image: 'car-a.jpg' },
    { id: 2, name: 'Remera 2', price: '$25,000', image: 'car-b.jpg' },
    { id: 3, name: 'Remera 3', price: '$30,000', image: 'car-c.jpg' },
  ];

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.name} agregado al carrito!`);
  };

  return (
    <div className='mt-8 p-4 border rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Tienda</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {remes.map((rem) => (
          <div key={rem.id} className='border p-4 rounded shadow'>
            <img
              src={rem.image}
              alt={rem.name}
              className='w-full h-40 object-cover mb-2'
            />
            <h3 className='text-lg font-bold'>{rem.name}</h3>
            <p className='text-gray-600'>{rem.price}</p>
            <button
              className='mt-2 px-4 py-2 bg-blue-500 text-black rounded'
              onClick={() => addToCart(rem)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarShop;
