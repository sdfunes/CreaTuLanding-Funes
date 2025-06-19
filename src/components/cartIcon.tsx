import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useContext, useState } from 'react';
import { cartContext } from '../context/CartContext';

import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
} from 'firebase/firestore';

function CartIcon({ count, cartItems = [] }) {
  const [showCart, setShowCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { clearCart } = useContext(cartContext);
  const [orderId, setOrderId] = useState(null);

  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, 'orders'), {
        items: cartItems,
        total,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      alert('Error al guardar la compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative'>
      <Button
        variant='ghost'
        className='p-2'
        size={undefined}
        onClick={() => setShowCart((prev) => !prev)}
      >
        <ShoppingCart className='w-6 h-6' />
      </Button>
      {count > 0 && (
        <span className='absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
          {count}
        </span>
      )}
      {showCart && (
        <div className='absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10 p-4'>
          <h4 className='font-bold mb-2'>Mi Carrito</h4>
          {cartItems.length === 0 ? (
            <p className='text-gray-500'>El carrito está vacío.</p>
          ) : (
            <form onSubmit={handleBuy}>
              <ul>
                {cartItems.map((item, idx) => (
                  <li key={idx} className='border-b py-1'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-12 h-12 object-cover mb-2'
                    />
                    {item.title} - {item.description} - ${item.price}
                  </li>
                ))}
              </ul>
              <div className='font-bold mt-2'>Total: ${total}</div>
              <Button
                type='submit'
                className='w-full mt-3'
                disabled={loading}
                variant={undefined}
                size={undefined}
              >
                {loading ? 'Procesando...' : 'Comprar'}
              </Button>
              {success && (
                <div className='text-green-600 mt-2 text-sm'>
                  ¡Compra realizada con éxito! ID de la orden:{' '}
                  <span className='font-mono'>{orderId}</span>
                </div>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default CartIcon;
