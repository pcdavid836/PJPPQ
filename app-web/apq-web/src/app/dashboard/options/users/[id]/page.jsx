import React from 'react';
import { conn } from "@/libs/mysql";
import ProfileUser from '../../../../../components/ShowUserProfile/UserProfile';



async function UsersIDPage({ params }) {

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Perfil del Usuario:</h1>
          <div className="btn-toolbar mb-2 mb-md-0"></div>
        </div>
        <div className='p-2'>
          <ProfileUser newReqId={params.id} />
        </div>
      </main>
    </div>
  );
}


export default UsersIDPage;
