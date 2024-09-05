"use client";
import React, { useState } from 'react';

function SearchFormParkRecords({ mainId, onSearch }) {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const [fechaInicio, setFechaInicio] = useState(today);
    const [fechaFin, setFechaFin] = useState(today);
    const [confirmacionSalida, setConfirmacionSalida] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!fechaInicio || !fechaFin) {
            setError('Por favor, selecciona un rango de fechas.');
        } else if (isNaN(mainId)) { // Asegúrate de que mainId es un número
            setError('ID debe ser un número');
        } else {
            setError(null);
            onSearch({ fechaInicio, fechaFin, confirmacionSalida, id: mainId }); // Usa mainId aquí
            //console.log({ fechaInicio, fechaFin, confirmacionSalida, id: mainId });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container pb-4">
            <div className="row mb-2">
                <div className="col-md-6">
                    <label htmlFor="fechaInicio">Fecha de Inicio</label>
                    <input type="date" id="fechaInicio" className="form-control" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="fechaFin">Fecha de Fin</label>
                    <input type="date" id="fechaFin" className="form-control" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                </div>
            </div>
            <div className="row mt-2 mb-2">
                <div className="col-md-6">
                    <label htmlFor="confirmacionSalida">Reserva completada?</label>
                    <select id="confirmacionSalida" className="form-select" value={confirmacionSalida} onChange={(e) => setConfirmacionSalida(e.target.value)}>
                        <option value="">Seleccionar...</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </div>
            <div className="d-grid mx-auto">
                <button type="submit" className="btn btn-success btn-block">Buscar</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
        </form>
    )
}

export default SearchFormParkRecords;
