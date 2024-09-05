"use client";
import React, { useState, useEffect } from 'react'
import UserCard from '../../../../components/Card4User/UserCard';
import axios from 'axios';
import SearchFormUsers from '@/components/SearchComponents/SearchUsers/SearchFormUsers';


async function loadUsers() {
  const { data } = await axios.get(`/api/users`);
  return data;
}

async function loadSearchedUsers(searchParams) {
  const { data } = await axios.post(`/api/users/searchuser`, searchParams);
  return data;
}

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers().then(setUsers);
  }, []);

  const handleSearch = async (searchParams) => {
    const users = await loadSearchedUsers(searchParams);
    setUsers(users);
  }

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Usuarios</h1>
          <div className="btn-toolbar mb-2 mb-md-0"></div>
        </div>
        <div>
          <SearchFormUsers onSearch={handleSearch} />
        </div>
        <div className="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.idUsuario} className="col mb-4 mx-auto">
                <UserCard user={user} />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center w-100">
              <h6>No se encontró ningún usuario.</h6>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default UserPage;
