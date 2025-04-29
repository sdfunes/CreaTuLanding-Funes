import React from "react";

function CarShop() {
  const cars = [
    { id: 1, name: "Car A", price: "$20,000", image: "car-a.jpg" },
    { id: 2, name: "Car B", price: "$25,000", image: "car-b.jpg" },
    { id: 3, name: "Car C", price: "$30,000", image: "car-c.jpg" },
  ];

  return (
    <div className="mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Car Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car.id} className="border p-4 rounded shadow">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-lg font-bold">{car.name}</h3>
            <p className="text-gray-600">{car.price}</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarShop;