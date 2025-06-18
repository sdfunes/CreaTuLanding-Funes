import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function CarShop() {
  const [cart, setCart] = useState([]);
  const [remes, setRemes] = useState([]);
  const db = getFirestore();
  const itemsCollectionRef = collection(db, 'products');

  const getRemeras = async () => {
    const querySnapshot = await getDocs(itemsCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  //const q = query(itemsCollectionRef, where('price', '>', 100));
  useEffect(() => {
    const fetchRemes = async () => {
      const data = await getRemeras();
      setRemes(data);
    };
    fetchRemes();
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`${item.title} agregado al carrito!`);
  };

  return (
    <div className='mt-8 p-4 border rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Tienda</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {remes.map((rem) => (
          <div key={rem.id} className='border p-4 rounded shadow'>
            <img
              src='/assets/img/reme1.jpg'
              alt={rem.title}
              className='w-full h-40 object-cover mb-2'
            />
            <h3 className='text-lg font-bold'>{rem.title}</h3>
            <p className='text-gray-600'>${rem.price}</p>
            <button>
              <Link to={`/details/${rem.id}`}>Ver Detalle</Link>
            </button>
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
