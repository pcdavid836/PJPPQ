"use client";
import React, { useState } from 'react'
import { BsChevronDown } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const AccordionReports = ({ reports }) => {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const handleClick = () => {
        setIsVisible(!isVisible);
    }

    const handleValidate = async (idReporteParqueo) => {
        const toAprobe = { Valido: 1, Estado: 0 };
        const res = await axios.put("/api/reports/fromuser/" + idReporteParqueo, toAprobe);
        router.refresh();
    }

    const handleDeny = async (idReporteParqueo) => {
        const toDeny = { Estado: 0, Valido: 0 };
        const res = await axios.put("/api/reports/fromuser/" + idReporteParqueo, toDeny);
        router.refresh();
    }

    return (
        <div>
            {reports.map((report, index) => (
                <div className="card mb-2" key={index}>
                    <button className="btn btn-dark w-100 fs-5 d-flex align-items-center justify-content-between" onClick={handleClick}>
                        <span>Reporte de <a href={`/dashboard/options/parks/profileView/${report.parqueo_idParqueo}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}> {report.Titulo}</a> ( {new Date(report.FechaCreacion).toLocaleDateString()})</span>
                        <BsChevronDown />
                    </button>
                    {isVisible && (
                        <div className="card-body">
                            <p><strong>Motivo:</strong> {report.Motivo}</p>
                            <p><strong>Descripción:</strong> {report.Descripcion}</p>
                            <p><strong>Usuario Reportado:</strong> <a href={`/dashboard/options/users/${report.usuario_idUsuario}`} target="_blank" rel="noopener noreferrer"> {report.Nombres} {report.Primer_Apellido} {report.Segundo_Apellido}</a></p>
                            <p><strong>Establecimiento que realizo el reporte:</strong><a href={`/dashboard/options/parks/profileView/${report.parqueo_idParqueo}`} target="_blank" rel="noopener noreferrer"> {report.Titulo}</a></p>
                            <p><strong>Fecha Creación:</strong> {new Date(report.FechaCreacion).toLocaleDateString()}</p>
                            {(report.Estado === 0 && report.Valido === 0) && <div className="alert alert-light" role="alert">Este reporte fue marcado como <strong>NO</strong> valido!</div>}
                            {(report.Estado === 0 && report.Valido === 1) && <div className="alert alert-warning" role="alert">Este reporte fue marcado como valido!</div>}
                            <div className="d-flex justify-content-between">
                                <button className="btn btn-success w-100 me-2" onClick={() => handleValidate(report.idReporteParqueo)}>Validar</button>
                                <button className="btn btn-danger w-100 ms-2" onClick={() => handleDeny(report.idReporteParqueo)}>Denegar</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default AccordionReports
