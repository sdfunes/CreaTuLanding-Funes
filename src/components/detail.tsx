import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDetail } from '../lib/async.js';
function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState<any>({});
  useEffect(() => {
    getDetail(id).then((reme) => setDetail(reme));
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
          <p className='text-gray-600'>{detail.price}</p>
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
