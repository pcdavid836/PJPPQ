"use client";
import React, { useState } from 'react'

function SearchFormVehicles({ onSearch }) {
    const [Tipo_Vehiculo_idTipo_Vehiculo, setTipo_Vehiculo_idTipo_Vehiculo] = useState('');
    const [Placa, setPlaca] = useState('');
    const [IdVehiculo, setIdVehiculo] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Estado, setEstado] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNaN(IdVehiculo)) {
            setError('ID Vehiculo debe ser un número');
        } else {
            setError(null);
            onSearch({ Tipo_Vehiculo_idTipo_Vehiculo, Placa, IdVehiculo, Descripcion, Estado });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="row mb-2">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Placa del vehículo..." value={Placa} onChange={(e) => setPlaca(e.target.value)} maxLength={45} />
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Descripción del vehículo..." value={Descripcion} onChange={(e) => setDescripcion(e.target.value)} maxLength={150} />
                </div>
            </div>
            <div className="row mt-2 mb-2">
                <div className="col-md-4">
                    <select className="form-select" value={Tipo_Vehiculo_idTipo_Vehiculo} onChange={(e) => setTipo_Vehiculo_idTipo_Vehiculo(e.target.value)}>
                        <option value="">Todos</option>
                        <option value="1">Automóvil</option>
                        <option value="2">Motocicleta</option>
                        <option value="3">Bicicleta</option>
                        <option value="4">Camión</option>
                        <option value="5">Autobus</option>
                        <option value="6">Minibus</option>
                        <option value="7">Misceláneo</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <select className="form-select" value={Estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="1">Activo</option>
                        <option value="0">Eliminado</option>
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="number" className="form-control" placeholder="ID Vehiculo..." value={IdVehiculo} onChange={(e) => setIdVehiculo(e.target.value)} />
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-success btn-block">Buscar</button>
            </div>
        </form>
    )
}

export default SearchFormVehicles
