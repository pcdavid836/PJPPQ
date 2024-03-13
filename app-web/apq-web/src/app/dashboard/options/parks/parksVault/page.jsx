import React from 'react'
import VaultCard from '@/components/Card4VaultPark/VaultCard'
import axios from 'axios';

async function loadPlaces() {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/parks/parksVault`);
    return data;
}

async function ParkVaultPage() {
    const places = await loadPlaces();
    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Lista de Parqueos</h1>
                    <div className="btn-toolbar mb-2 mb-md-0"></div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {places.map((place) => (
                        <div key={place.idParqueo} className="col mb-4 mx-auto">
                            <VaultCard place={place} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default ParkVaultPage;