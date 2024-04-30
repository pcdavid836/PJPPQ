"use client";
import React, { useState, useEffect } from 'react'
import ParkCard from '@/components/Cards4Reports/ParkReportCard'
import UserCard from '@/components/Cards4Reports/UserReportCard';
import axios from 'axios';

function loadPlaces(setPlaces) {
  axios.get(`/api/reports/frompark`)
    .then(({ data }) => setPlaces(data))
    .catch((error) => console.error(error));
}

function loadUsers(setUsers) {
  axios.get(`/api/reports/fromuser`)
    .then(({ data }) => setUsers(data))
    .catch((error) => console.error(error));
}

function ReportPage() {
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState('users'); // initial state

  useEffect(() => {
    loadPlaces(setPlaces);
    loadUsers(setUsers);
  }, []);

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Reportes</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
            <button className="btn btn-secondary mx-2" style={{ backgroundColor: 'orange', color: 'white', borderRadius: '20px' }} onClick={() => setShow('users')}>Reportes de Usuario</button>
            <button className="btn btn-secondary mx-2" style={{ backgroundColor: 'orange', color: 'white', borderRadius: '20px' }} onClick={() => setShow('places')}>Reportes de Parqueos</button>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {show === 'places' && places.map((place) => (
            <div key={place.idParqueo} className="col mb-4 mx-auto">
              <ParkCard place={place} />
            </div>
          ))}
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {show === 'users' && users.map((user) => (
            <div key={user.idUsuario} className="col mb-4 mx-auto">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default ReportPage
