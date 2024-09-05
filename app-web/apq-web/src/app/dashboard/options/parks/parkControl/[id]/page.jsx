"use client";
import React, { useState, useEffect } from 'react'
import AccordionCore from '@/components/TransactCore/AccordionCore'
import axios from 'axios';
import MoneyCounter from '@/components/AlertCounter/AmmountCounterMoney/MoneyCounter'
import SearchFormParkRecords from '@/components/SearchComponents/SearchParkRecords/SearchFormParkRecords'

async function loadCoreCards(mainId) {
    const { data } = await axios.get(`/api/parks/parksrecord/${mainId}`);
    return data;
}

async function loadCountMoneyFromPark(mainId) {
    const { data } = await axios.get(`/api/parks/parksrecord/ammountCounter/${mainId}`);
    return data;
}

async function loadCountMoneyFromParkSearch(searchParams) {
    try {
        const { data } = await axios.post(`/api/parks/parksrecord/ammountCounter`, searchParams);
        return data;
    } catch (error) {
        console.error('Error loading counted money:', error);
        return { total_amount: "0.00" }; // Devuelve un valor por defecto en caso de error
    }
}

async function loadSearchResults(searchParams) {
    const { data } = await axios.post(`/api/parks/parksrecord`, searchParams);
    return data;
}

function ParkControlTransactions({ params }) {
    const [transactCards, setTransactCards] = useState([]);
    const [countedMoney, setCountedMoney] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    useEffect(() => {
        loadCoreCards(params.id).then(setTransactCards);
        loadCountMoneyFromPark(params.id).then(setCountedMoney);
    }, []);

    const handleSearch = async (searchParams) => {
        setSearchPerformed(true);
        const completeSearchParams = { ...searchParams, id: params.id };
        try {
            const results = await loadSearchResults(completeSearchParams);   
            setSearchResults(results);
            const countedMoneyResult = await loadCountMoneyFromParkSearch(completeSearchParams);
            console.log(countedMoneyResult);
            setCountedMoney(countedMoneyResult);
        } catch (error) {
            console.error('Error loading search results:', error);
        }
    };


    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Control de Parqueo</h1>
                    <div className="btn-toolbar mb-2 mb-md-0"></div>
                </div>
                <div className="p-4">
                    <SearchFormParkRecords mainId={params.id} onSearch={handleSearch} />
                    {countedMoney && <MoneyCounter countedMoney={countedMoney} />}
                    {searchPerformed && searchResults.length === 0
                        ? <h2>No se encontraron datos relacionados con la búsqueda.</h2>
                        : <AccordionCore transactCards={searchResults.length > 0 ? searchResults : transactCards} />}
                </div>
            </main>
        </div>
    )
}

export default ParkControlTransactions;
