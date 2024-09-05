"use client";
import React, { useState, useEffect } from 'react'
import VaultCard from '@/components/Card4VaultPark/VaultCard'
import axios from 'axios';
import SearchFormVault from '@/components/SearchComponents/SearchVault/SearchFormVault';


//VISTA MODO BAUL

async function loadPlaces() {
    const { data } = await axios.get(`/api/parks/parksVault`);
    return data;
}

async function loadSearchedPlaces(searchParams) {
    const { data } = await axios.post(`/api/parks/parksVault`, searchParams);
    return data;
}


function ParkVaultPage() {

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
                    <h1 className="h2">Lista de Parqueos</h1>
                    <div className="btn-toolbar mb-2 mb-md-0"></div>
                </div>
                <div >
                    <SearchFormVault onSearch={handleSearch} />
                </div>
                <div className="row mt-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {places.length > 0 ? (
                        places.map((place) => (
                            <div key={place.idParqueo} className="col mb-4 mx-auto">
                                <VaultCard place={place} />
                            </div>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center w-100">
                            <h6>No se encontró ningun establecimiento.</h6>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default ParkVaultPage;