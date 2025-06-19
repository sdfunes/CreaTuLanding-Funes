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
  const { clearCart, removeFromCart } = useContext(cartContext);
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
      setTimeout(() => {
        clearCart();
        setSuccess(false);
      }, 5000);
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
                  <li
                    key={idx}
                    className='border-b py-1 flex items-center gap-2'
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className='w-12 h-12 object-cover mb-2'
                    />
                    <div className='flex-1'>
                      {item.title} - {item.description} - ${item.price}
                    </div>
                    <Button
                      type='button'
                      className='ml-2 text-red-500'
                      size='icon'
                      variant='ghost'
                      onClick={() => {
                        removeFromCart(item.id);
                      }}
                      title='Eliminar'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M6 18L18 6M6 6l12 12'
                        />
                      </svg>
                    </Button>
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
              <Button
                type='button'
                className='w-full mt-2 bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center justify-center gap-2'
                onClick={clearCart}
                disabled={loading}
                variant={undefined}
                size={undefined}
                title='Vaciar carrito'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 6v6m4-6v6'
                  />
                </svg>
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
