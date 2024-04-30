import React from 'react'

function UserReportsCounter({ countedReports }) {
    return (
        <div className="alert alert-light">
            <div className="row">
                <div className="col text-center">
                    <strong>Reportes pendientes</strong>
                    <p>{countedReports.Reporte_Pendiente}</p>
                </div>
                <div className="col text-center">
                    <strong>Reportes Validos</strong>
                    <p>{countedReports.Reporte_Valido}</p>
                </div>
                <div className="col text-center">
                    <strong>Reportes Rechazados</strong>
                    <p>{countedReports.Reporte_Rechazado}</p>
                </div>
            </div>
        </div>
    )
}

export default UserReportsCounter;
