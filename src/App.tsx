import Navbar from '@/components/navbar';
import CarShop from '@/components/carShop';
import NotFoundComponent from '@/components/notFoundComponent';
import Detail from '@/components/detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <h1 className='text-3xl font-bold'>Remes pintadas a Mano</h1>
        <Navbar />
        <Routes>
          <Route path='/' element={<CarShop />} />
          <Route path='/about' element={<div>About</div>} />
          <Route path='/contact' element={<div>Contact</div>} />
          <Route path='/details/:id' element={<Detail />} />
          <Route path='*' element={<NotFoundComponent />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
