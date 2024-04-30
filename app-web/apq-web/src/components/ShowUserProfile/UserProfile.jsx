'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function UserProfile({ newReqId }) {
    const [requestUser, setRequestUser] = useState({
        idUsuario: '',
        Correo: '',
        Nombres: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        CI: '',
        Celular: '',
        Contrasena: '',
        Estado: '',
        Tipo_Usuario_idTipo_Usuario: '',
        Url_Imagen: '',
        FechaCreacion: '',
        FechaActualizacion: '',
        Ban: '',
        Codigo: '',
        Correo_Externo: ''
    });

    const [toDefault, setToDefault] = useState({
        Url_Imagen: 'default',
    });

    const [toBan, setToBan] = useState({
        Ban: 1,
    });

    const [errors, setErrors] = useState({
        idUsuario: '',
        Correo: '',
        Nombres: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        CI: '',
        Celular: '',
        Contrasena: '',
        Estado: '',
        Tipo_Usuario_idTipo_Usuario: '',
        Url_Imagen: '',
        FechaCreacion: '',
        FechaActualizacion: '',
        Ban: '',
        Codigo: '',
        Correo_Externo: ''
    });

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/users/' + newReqId)
            .then(res => {
                setRequestUser({
                    idUsuario: res.data.idUsuario,
                    Correo: res.data.Correo,
                    Nombres: res.data.Nombres,
                    Primer_Apellido: res.data.Primer_Apellido,
                    Segundo_Apellido: res.data.Segundo_Apellido,
                    CI: res.data.CI,
                    Celular: res.data.Celular,
                    Contrasena: res.data.Contrasena,
                    Estado: res.data.Estado,
                    Tipo_Usuario_idTipo_Usuario: res.data.Tipo_Usuario_idTipo_Usuario,
                    Url_Imagen: res.data.Url_Imagen,
                    FechaCreacion: res.data.FechaCreacion,
                    FechaActualizacion: res.data.FechaActualizacion,
                    Ban: res.data.Ban,
                    Codigo: res.data.Codigo,
                    Correo_Externo: res.data.Correo_Externo
                })
            })
    }, [newReqId]);
    //console.log(requestUser);


    const handleUpdateClick = async (e) => {
        e.preventDefault();

        //console.log(requestUser);
    };

    const handleRemoveImage = async () => {
        setToDefault({ Url_Imagen: 'default' });
        const res = await axios.put("/api/users/" + requestUser.idUsuario, toDefault);
        //console.log(res);
        router.refresh();
    }


    const handleBanUser = async () => {
        setToBan({ Ban: 1 });
        const res = await axios.put("/api/users/" + requestUser.idUsuario, toBan);
        router.refresh();
    }


    return (
        <div className="container py-5 h-100 custom-container">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body text-center">
                        <div className="mt-3 mb-4 d-flex justify-content-center">
                            <img src={requestUser.Url_Imagen === 'default' || requestUser.Url_Imagen === null ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323' : requestUser.Url_Imagen}
                                className="rounded-circle img-fluid" style={{ width: '100px' }} alt="User" />
                        </div>

                        <h4 className="mb-2">{requestUser.Nombres} {requestUser.Primer_Apellido} {requestUser.Segundo_Apellido}</h4>
                        <p className="text-muted mb-4">Información:</p>
                        <div className="mb-4 pb-2">
                            <div className="row">
                                <div className="col">
                                    <p className="text-muted"><strong>Correo:</strong> {requestUser.Correo}</p>
                                </div>
                                <div className="col">
                                    <p className="text-muted"><strong>Celular:</strong> {requestUser.Celular}</p>
                                </div>
                                <div className="col">
                                    <p className="text-muted"><strong>CI:</strong> {requestUser.CI}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <p className="text-muted"><strong>Creado el:</strong> {new Date(requestUser.FechaCreacion).toLocaleString()}</p>
                                </div>
                                <div className="col">
                                    <p className="text-muted"><strong>Ultima vez Actualizado:</strong> {new Date(requestUser.FechaActualizacion).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <p className="text-muted">Estado: {requestUser.Estado === 1 ? 'Activo' : 'Desactivado'}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    {requestUser.Ban === 1 && <p className="text-muted">Este usuario fue baneado</p>}
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <button type="button" className="btn btn-primary" onClick={handleRemoveImage}>Quitar imagen</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-warning" onClick={handleBanUser}>Banear Usuario</button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-success" onClick={handleUpdateClick}>Modificar</button>
                                </div>
                                <div className="col">
                                    <Link href={`/dashboard/options/users/userVehicles/${requestUser.idUsuario}`}>
                                        <button type="button" className="btn btn-secondary">Ver vehiculos</button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default UserProfile;
