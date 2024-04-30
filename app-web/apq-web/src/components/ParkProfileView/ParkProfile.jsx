"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function ParkProfile({ parkData, schedules }) {
    console.log(parkData)
    const router = useRouter();
    const [toVault, setToVault] = useState({
        Estado: 0,
    });
    const [toImage, setImage] = useState({
        Url_imagen: 'defaultPark',
    });
    // Definir el estado para los modales
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    // Funciones para abrir y cerrar los modales
    const toggle = () => setModal(!modal);
    const toggle2 = () => setModal2(!modal2);

    // Funciones para manejar la eliminación de la imagen y mover al baul
    // Estas funciones deben ser definidas para realizar las acciones correspondientes
    const deleteImage = async () => {
        setImage({ Url_imagen: 'defaultPark' });
        const res = await axios.put("/api/parks/" + parkData.idParqueo, toImage);
        router.refresh();
        toggle2();

    };

    const moveToVault = async () => {
        setToVault({ Estado: 0 });
        const res = await axios.put("/api/parks/" + parkData.idParqueo, toVault);
        router.refresh();
        toggle();

    };

    const returnPark = async () => {
        setToVault({ Estado: 1 });
        const res = await axios.put("/api/parks/" + parkData.idParqueo, toVault);
        router.refresh();
    };


    // Función para convertir el id del día a nombre del día
    const getDayName = (dayId) => {
        const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
        return days[dayId - 1] || '';
    };

    // Función para formatear la hora
    const formatTime = (time) => new Date(`1970-01-01T${time}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return (
        <div>
            <h5>{parkData.Titulo}</h5>
            <div className="d-flex justify-content-center mb-3">
                <img
                    src={parkData.Url_imagen === 'defaultPark' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7' : parkData.Url_imagen}
                    className="img-fluid"
                    alt="Imagen del parqueo"
                    style={{ width: '500px', height: '250px', objectFit: 'cover' }}
                />
            </div>
            <p>{parkData.Descripcion}</p>
            <p><strong>Tamaño:</strong> {parkData.Tamaño}m2</p>
            <p><strong>Dueño:</strong> <a href={`/dashboard/options/users/${parkData.idUsuario}`} target="_blank">{parkData.Nombres} {parkData.Primer_Apellido} {parkData.Segundo_Apellido}</a></p>
            <p><strong>Documento:</strong><a href={parkData.Url_validacion} target="_blank"> Ver archivo</a></p>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Días de atencion</th>
                        <th scope="col">Hora de Apertura</th>
                        <th scope="col">Hora de Cierre</th>
                        <th scope="col">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{getDayName(schedule.dias_semana_idDia)}</td>
                            <td>{formatTime(schedule.hora_apertura)}</td>
                            <td>{formatTime(schedule.hora_cierre)}</td>
                            <td>{schedule.Estado === 1 ? 'Activo' : 'Desactivado'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {parkData.Estado === 0 &&
                <div>
                    <div className="alert alert-danger" role="alert">
                        ACTUALMENTE ESTE PARQUEO SE ENCUENTRA EN EL BAUL
                    </div>
                    <button className="btn btn-success btn-block my-2 w-100" onClick={returnPark}>
                        Retornar Parqueo
                    </button>
                </div>
            }
            <div className="col"></div>
            <Button className="btn w-100" color="secondary" onClick={toggle2}>
                Eliminar Imagen
            </Button>
            <Modal isOpen={modal2} toggle={toggle2}>
                <ModalHeader toggle={toggle2}>Eliminar imagen</ModalHeader>
                <ModalBody>
                    Estas seguro?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={deleteImage}>
                        Si
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle2}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
            <div className="d-flex mt-1 mb-1">
                <div className="flex-fill mr-1">
                    <Link href={`/dashboard/options/parks/${parkData.idParqueo}`}>
                        <button className="btn btn-warning btn-block w-100" type="button">
                            Modificar
                        </button>
                    </Link>
                </div>
                <div className="flex-fill ml-1">
                    <Button className="btn btn-danger btn-block w-100" color="danger" onClick={toggle}>
                        Mover al Baul
                    </Button>
                </div>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Mover al baul</ModalHeader>
                    <ModalBody>
                        ¿Estás seguro?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={moveToVault}>
                            Si
                        </Button>{' '}
                        <Button color="secondary" onClick={toggle}>
                            No
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
            <div className="row  mt-1 mb-1">
                <div className="col">
                    <Link href={`/dashboard/options/parks/sidekicks/${parkData.idParqueo}`}>
                        <button className="btn btn-primary btn-block w-100" type="button">
                            Lista de Ayudantes
                        </button>
                    </Link>
                </div>
                <div className="col">
                    <Link href={`/dashboard/options/parks/stunnedUsers/${parkData.idParqueo}`}>
                        <button className="btn btn-secondary btn-block w-100" type="button">
                            Silenciados
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ParkProfile;
