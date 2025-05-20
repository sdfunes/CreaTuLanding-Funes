import Navbar from '@/components/navbar';
import CarShop from '@/components/carshop';
import NotFoundComponent from '@/components/carshop';
import Detail from '@/components/detail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
