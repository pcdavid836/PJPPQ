"use client";
import React, { useState } from 'react'

function SearchFormUsers({ onSearch }) {

    const [idUsuario, setIdUsuario] = useState('');
    const [Nombres, setNombres] = useState('');
    const [Primer_Apellido, setPrimer_Apellido] = useState('');
    const [Celular, setCelular] = useState('');
    const [CI, setCI] = useState('');
    const [Estado, setEstado] = useState('');
    const [Ban, setBan] = useState('');
    const [Correo, setCorreo] = useState('');
    const [Tipo_Usuario_idTipo_Usuario, setTipo_Usuario_idTipo_Usuario] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isNaN(idUsuario)) {
            setError('ID Usuario debe ser un número');
        } else {
            setError(null);
            onSearch({ idUsuario, Nombres, Primer_Apellido, Celular, CI, Estado, Ban, Correo, Tipo_Usuario_idTipo_Usuario });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <div className="row mb-2">
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Nombres del usuario..." value={Nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Primer apellido del usuario..." value={Primer_Apellido} onChange={(e) => setPrimer_Apellido(e.target.value)} />
                </div>
            </div>
            <div className="row mt-2 mb-2">
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Celular del usuario..." value={Celular} onChange={(e) => setCelular(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="CI del usuario..." value={CI} onChange={(e) => setCI(e.target.value)} />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Correo del usuario..." value={Correo} onChange={(e) => setCorreo(e.target.value)} />
                </div>
            </div>
            <div className="row mt-2 mb-2">
                <div className="col-md-3">
                    <select className="form-select" value={Estado} onChange={(e) => setEstado(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="1">Activo</option>
                        <option value="0">Eliminado</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={Ban} onChange={(e) => setBan(e.target.value)}>
                        <option value="">Ambos</option>
                        <option value="1">Baneado</option>
                        <option value="0">Vigente</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-select" value={Tipo_Usuario_idTipo_Usuario} onChange={(e) => setTipo_Usuario_idTipo_Usuario(e.target.value)}>
                        <option value="1">Usuario</option>
                        <option value="2">Cuidador</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <input type="number" className="form-control" placeholder="ID Usuario..." value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
                    {error && <p className="text-danger">{error}</p>}
                </div>
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-success btn-block">Buscar</button>
            </div>
        </form>
    )
}

export default SearchFormUsers
