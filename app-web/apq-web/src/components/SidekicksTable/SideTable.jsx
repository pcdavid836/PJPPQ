'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SideTable({ sidekicks }) {
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
            axios.post("/api/parks/coop", modifyData)
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
                    <th scope="col">Ayudante?</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Opciones</th>
                </tr>
            </thead>
            <tbody>
                {sidekicks.map((sidekick) => (
                    <tr key={sidekick.parqueo_idParqueo}>
                        <td>{sidekick.Nombres} {sidekick.Primer_Apellido} {sidekick.Segundo_Apellido}</td>
                        <td>{sidekick.Co_cuidador === 0 ? 'Dueño' : 'Sí'}</td>
                        <td>{sidekick.Estado === 1 ? 'Activo' : 'Desactivado'}</td>
                        <td>
                            {(sidekick.Estado === 1 && sidekick.Co_cuidador === 1) &&
                                <button className="btn btn-danger" onClick={() => handleRemove(sidekick.usuario_idUsuario, sidekick.parqueo_idParqueo)}>Quitar</button>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default SideTable;
