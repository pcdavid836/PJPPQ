import React from 'react';
import { conn } from "@/libs/mysql";
import UserCardVehicle from '../../../../../../components/Card4UserVehicle/UserVehicleCard'; // Import userCardVehicle

async function loadRequests(requestId) {
    try {
        const data = await conn.query("SELECT * FROM vehiculo WHERE usuario_idUsuario = ? AND Estado = 1", [
            requestId,
        ]);
        // Convertir los datos en un objeto plano
        const plainData = JSON.parse(JSON.stringify(data));
        return Array.isArray(plainData) ? plainData : [plainData];
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function loadRequests2(requestId2) {
    try {
        const data = await conn.query("SELECT * FROM usuario WHERE idUsuario = ? AND Estado = 1", [
            requestId2,
        ]);
        // Convertir los datos en un objeto plano
        const plainData2 = JSON.parse(JSON.stringify(data));
        return Array.isArray(plainData2) ? plainData2 : [plainData2];
    } catch (error) {
        console.error(error);
        return [];
    }
}



async function UserVehiclesIDPage({ params }) {
    const cars = await loadRequests(params.id);
    const [userInfo] = await loadRequests2(params.id);

    return (
        <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
            <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                    <h1 className="h2">
                        Vehículos del usuario: {userInfo ? `${userInfo.Nombres} ${userInfo.Primer_Apellido} ${userInfo.Segundo_Apellido}` : 'Cargando...'}
                    </h1>
                    <div className="btn-toolbar mb-2 mb-md-0"></div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {cars.map((car) => (
                        <div key={car.idVehiculo} className="col mb-4 mx-auto">
                            <UserCardVehicle car={car} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}




export default UserVehiclesIDPage;
