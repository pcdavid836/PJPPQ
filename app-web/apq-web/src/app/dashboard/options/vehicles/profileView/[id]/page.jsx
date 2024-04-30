import React from 'react';
import axios from 'axios';
import ProfileVehicle from '@/components/VehicleProfileView/VehicleProfile';

async function loadCarData(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/vehicles/${mainId}`);
    return data;
}


async function VehicleProfilePage({ params }) {
    const carData = await loadCarData(params.id);

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Información del vehiculo:</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className='p-4'>
                    {carData && <ProfileVehicle carData={carData} />}
                </div>
            </main>
        </div>
    )
}

export default VehicleProfilePage
