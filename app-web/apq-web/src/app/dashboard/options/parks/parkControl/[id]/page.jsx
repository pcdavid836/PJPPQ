import React from 'react'
import AccordionCore from '@/components/TransactCore/AccordionCore'
import axios from 'axios';

async function loadCoreCards(mainId) {
    const { data } = await axios.get(`${process.env.NEXTAUTH_URL}/api/parks/parksrecord/${mainId}`);
    return data;
}

async function ParkControlTransactions({ params }) {
    const transactCards = await loadCoreCards(params.id);
    //console.log(transactCards)
    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Lista de Reservas</h1>
                    <div className="btn-toolbar mb-2 mb-md-0"></div>
                </div>
                <div className="p-4">
                    {transactCards && <AccordionCore transactCards={transactCards} />}
                </div>
            </main>
        </div>
    )
}

export default ParkControlTransactions;