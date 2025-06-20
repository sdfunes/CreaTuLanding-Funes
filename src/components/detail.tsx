import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import ItemCount from '@/components/itemCount';
import { useContext } from 'react';

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>({});
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      const db = getFirestore();
      const productsCol = collection(db, 'products');
      const data = await getDocs(productsCol);
      const product = data.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .find((item) => item.id === id);
      setDetail(product || {});
    };
    fetchDetail();
  }, []);

  return (
    <div className='mt-8 p-4 border rounded shadow'>
      <h2 className='text-2xl font-semibold mb-4'>Detalle de la remera</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div key={detail.id} className='border p-4 rounded shadow'>
          <img
            src={detail.image}
            alt={detail.title}
            className='w-full h-40 object-cover mb-2'
          />
          <h3 className='text-lg font-bold'>{detail.title}</h3>
          <p className='text-gray-600'>${detail.price}</p>
          <p className='text-lg'>{detail.category}</p>
          <p className='text-gray-600 mt-5'>{detail.description}</p>
          <ItemCount stock={10} initial={1} producto={detail} />

          <div className='mt-4 space-y-2'>
            <Button
              onClick={() => window.history.back()}
              className='w-full'
              variant={undefined}
              size={undefined}
            >
              Volver
            </Button>
          </div>
          {/* <Button
            className='mt-2 px-4 py-2 bg-blue-500 text-black rounded'
            onClick={() => alert(`${detail.name} agregado al carrito!`)}
          >
            <ShoppingCart size={16} />
            Agregar al carrito
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default Detail;
