"use client";
import React, { useState } from 'react'

function SearchFormRequest({ onSearch }) {
  const [Titulo, setTitulo] = useState('');
  const [Tipo_Parqueo_idTipo_Parqueo, setTipo_Parqueo_idTipo_Parqueo] = useState('');
  const [idParqueo, setIdParqueo] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    //console.log(Titulo, Tipo_Parqueo_idTipo_Parqueo, idParqueo);
    event.preventDefault();
    if (isNaN(idParqueo)) {
      setError('ID Parqueo debe ser un número');
    } else {
      setError(null);
      onSearch({ Titulo, Tipo_Parqueo_idTipo_Parqueo, idParqueo });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="row mb-2">
        <div className="col-md-10">
          <input type="text" className="form-control" placeholder="Buscar por Nombre del Parqueo..." value={Titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>
        <div className="d-grid col-md-2">
          <button type="submit" className="btn btn-success btn-block">Buscar</button>
        </div>
      </div>
      <div className="row mt-2 mb-2">
        <div className="col-md-6">
          <select className="form-select" value={Tipo_Parqueo_idTipo_Parqueo} onChange={(e) => setTipo_Parqueo_idTipo_Parqueo(e.target.value)}>
            <option value="">Todos</option>
            <option value="1">Privado</option>
            <option value="2">Publico</option>
            <option value="3">Taller mecánico</option>
            <option value="4">Taller de bicicletas</option>
          </select>
        </div>
        <div className="col-md-6">
          <input type="number" className="form-control" placeholder="ID Parqueo..." value={idParqueo} onChange={(e) => setIdParqueo(e.target.value)} />
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </form>
  )
}

export default SearchFormRequest
