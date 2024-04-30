import React from 'react'
import axios from 'axios'
import VehicleCard from '../../../../components/Card4Vehicle/VehicleCard';


async function loadVehicles() {
  const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/vehicles`);
  return data;
}

async function VehiclePage() {
  const cars = await loadVehicles();
  //console.log(cars);

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Vehículos</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {cars.map((car) => (
            <div key={car.idVehiculo} className="col mb-4 mx-auto">
              <VehicleCard car={car} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default VehiclePage