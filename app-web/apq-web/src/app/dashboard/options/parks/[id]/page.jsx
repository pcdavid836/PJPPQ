import React from 'react';
import { conn } from "@/libs/mysql";
import FormPark from '../../../../../components/EditPark/FormPark';

async function loadRequests(requestId) {
    const [data] = await conn.query("SELECT * FROM parqueo WHERE idParqueo = ?", [
        requestId,
    ]);
    return data;
}

async function EditParkPage({ params }) {
    const place = await loadRequests(params.id);

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">Modificar informacion de parqueo</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                    </div>
                </div>
                <div className='p-2'>
                    <FormPark newReqId={params.id} />
                </div>
            </main>
        </div>
    )
}

export default EditParkPage;
