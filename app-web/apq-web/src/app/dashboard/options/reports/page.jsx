"use client";
import React, { useState, useEffect } from 'react'
import ParkCard from '@/components/Cards4Reports/ParkReportCard'
import UserCard from '@/components/Cards4Reports/UserReportCard';
import axios from 'axios';
import SearchReportsFormPark from '@/components/SearchComponents/SearchReportsFromPark/SearchReportsFormPark';
import SearchReportsFromUser from '@/components/SearchComponents/SearchReportsFromUser/SearchReportsFromUser';

async function loadPlaces() {
  const { data } = await axios.get(`/api/reports/frompark`);
  return data;
}

async function loadSearchedPlaces(searchParams) {
  const { data } = await axios.post(`/api/reports/frompark`, searchParams);
  return data;
}

async function loadUsers() {
  const { data } = await axios.get(`/api/reports/fromuser`);
  return data;
}

async function loadSearchedUsers(searchParams) {
  const { data } = await axios.post(`/api/reports/fromuser`, searchParams);
  return data;
}

function ReportPage() {
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState('users'); // initial state

  useEffect(() => {
    loadPlaces().then(setPlaces);
    loadUsers().then(setUsers);
  }, []);

  const handleSearchPlaces = async (searchParams) => {
    const places = await loadSearchedPlaces(searchParams);
    setPlaces(places);
  }

  const handleSearchUsers = async (searchParams) => {
    const users = await loadSearchedUsers(searchParams);
    setUsers(users);
  }

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
        {show === 'places' && <SearchReportsFormPark onSearch={handleSearchPlaces} />}
        {show === 'users' && <SearchReportsFromUser onSearch={handleSearchUsers} />}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {show === 'places' && places.length > 0 ? (
            places.map((place) => (
              <div key={place.idParqueo} className="col mb-4 mx-auto">
                <ParkCard place={place} />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <h6></h6>
            </div>
          )}
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {show === 'users' && users.length > 0 ? (
            users.map((user) => (
              <div key={user.idUsuario} className="col mb-4 mx-auto">
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <h6></h6>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default ReportPage;
