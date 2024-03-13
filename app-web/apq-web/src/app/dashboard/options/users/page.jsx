import React from 'react'
import axios from 'axios'
import UserCard from '../../../../components/Card4User/UserCard';

async function loadUsers() {
  const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/users`);
  return data;
}

async function UserPage() {
  const users = await loadUsers();
  //console.log(users);

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Usuarios</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {users.map((user) => (
            <div key={user.idUsuario} className="col mb-4 mx-auto">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default UserPage
