import React from 'react';
import axios from 'axios';
import ProfilePark from '@/components/ParkProfileView/ParkProfile';

async function loadParkData(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/parks/profileview/${mainId}`);
    return data;
}

async function loadSchedules(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/schedules/${mainId}`);
    return data;
}

async function ParkProfilePage({ params }) {
    const parkData = await loadParkData(params.id);
    const schedules = await loadSchedules(parkData.idParqueo);

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Información del parqueo:</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className='p-4'>
                    {parkData && <ProfilePark parkData={parkData} schedules={schedules} />}
                </div>
            </main>
        </div>
    )
}

export default ParkProfilePage
