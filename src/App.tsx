import Navbar from "@/components/navbar";
import CarShop from "@/components/carshop";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Remes pintadas a Mano</h1>
        <CarShop />
      </main>
    </div>
  );
}

export default App;
