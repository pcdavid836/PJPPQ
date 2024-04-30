'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SilenceTable({ theforgotten }) {
    const [modifyData, setModifyData] = useState({
        usuario_idUsuario: '',
        parqueo_idParqueo: '',
        Estado: '',
    });

    const handleRemove = (usuario_idUsuario, parqueo_idParqueo) => {
        setModifyData({ usuario_idUsuario: usuario_idUsuario, parqueo_idParqueo: parqueo_idParqueo, Estado: 0 });
    }

    useEffect(() => {
        if (modifyData.usuario_idUsuario && modifyData.parqueo_idParqueo) {
            axios.post("/api/parks/silence", modifyData)
                .then(res => {
                    window.location.reload();
                })
                .catch(err => console.error(err));
        }
    }, [modifyData]);

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Usuario</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {theforgotten.map((theforgotten) => (
                    <tr key={theforgotten.parqueo_idParqueo}>
                        <td>{theforgotten.Nombres} {theforgotten.Primer_Apellido} {theforgotten.Segundo_Apellido}</td>
                        <td>{theforgotten.Estado === 1 ? 'Silenciado' : 'No Silenciado'}</td>
                        <td>
                            {(theforgotten.Estado === 1) &&
                                <button className="btn btn-danger" onClick={() => handleRemove(theforgotten.usuario_idUsuario, theforgotten.parqueo_idParqueo)}>Quitar</button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SilenceTable;
