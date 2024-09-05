"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlaceCard from '@/components/Card4Request/PlaceCard';
import SearchFormRequest from '@/components/SearchComponents/SearchRequests/SearchFormRequest';

async function loadPlaces() {
  const { data } = await axios.get(`/api/requests`);
  return data;
}

async function loadSearchedPlaces(searchParams) {
  const { data } = await axios.post(`/api/requests/search`, searchParams);
  return data;
}

function RequestPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    loadPlaces().then(setPlaces);
  }, []);

  const handleSearch = async (searchParams) => {
    const places = await loadSearchedPlaces(searchParams);
    setPlaces(places);
  }

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Solicitudes</h1>
        </div>
        <div >
          <SearchFormRequest onSearch={handleSearch} />
        </div>
        <div className="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {places.length > 0 ? (
            places.map((place) => (
              <div key={place.idParqueo} className="col mb-4 mx-auto">
                <PlaceCard place={place} />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <h6>No se encontró ninguna solicitud.</h6>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default RequestPage
