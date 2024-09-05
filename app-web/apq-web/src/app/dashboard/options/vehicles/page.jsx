"use client";
import React, { useState, useEffect } from 'react'
import VehicleCard from '../../../../components/Card4Vehicle/VehicleCard';
import axios from 'axios';
import SearchFormVehicles from '@/components/SearchComponents/SearchVehicles/SearchFormVehicles';

async function loadVehicles() {
  const { data } = await axios.get(`/api/vehicles`);
  return data;
}

async function loadSearchedVehicles(searchParams) {
  const { data } = await axios.post(`/api/vehicles`, searchParams);
  return data;
}

function VehiclePage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    loadVehicles().then(setCars);
  }, []);

  const handleSearch = async (searchParams) => {
    const cars = await loadSearchedVehicles(searchParams);
    setCars(cars);
  }

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Vehículos</h1>
          <div className="btn-toolbar mb-2 mb-md-0"></div>
        </div>
        <div>
          <SearchFormVehicles onSearch={handleSearch} />
        </div>
        <div className="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {cars.length > 0 ? (
            cars.map((car) => (
              <div key={car.idVehiculo} className="col mb-4 mx-auto">
                <VehicleCard car={car} />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <h6>No se encontró ningún vehículo.</h6>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default VehiclePage;
