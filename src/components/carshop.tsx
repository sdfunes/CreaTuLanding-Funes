import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function CarShop() {
  const [remes, setRemes] = useState([]);
  const db = getFirestore();
  const itemsCollectionRef = collection(db, 'products');

  const getRemeras = async () => {
    const querySnapshot = await getDocs(itemsCollectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  useEffect(() => {
    const fetchRemes = async () => {
      const data = await getRemeras();
      setRemes(data);
    };
    fetchRemes();
  }, []);

  return (
    <div className='mt-8 p-4 border rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Tienda</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {remes.map((rem) => (
          <div key={rem.id} className='border p-4 rounded shadow'>
            <img
              src={rem.image}
              alt={rem.title}
              className='w-full h-40 object-cover mb-2'
            />
            <h3 className='text-lg font-bold'>{rem.title}</h3>
            <p className='text-gray-600'>${rem.price}</p>
            <button>
              <Link to={`/details/${rem.id}`}>Ver Detalle</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarShop;
