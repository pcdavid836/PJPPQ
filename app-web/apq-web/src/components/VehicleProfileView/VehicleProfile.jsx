"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function VehicleProfile({ carData }) {
    console.log(carData)
    const router = useRouter();
    const [toVault, setToVault] = useState({
        Estado: 0,
    });
    const [toImage, setImage] = useState({
        Url_imagen: 'defaultVehicle',
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
        setImage({ Url_imagen: 'defaultVehicle' });
        const res = await axios.put("/api/vehicles/" + cardata.idVehiculo, toImage);
        router.refresh();
        toggle2();

    };

    const moveToVault = async () => {
        setToVault({ Estado: 0 });
        const res = await axios.put("/api/vehicles/" + carData.idVehiculo, toVault);
        router.refresh();
        toggle();

    };


    const getTipoVehiculoText = (idTipoVehiculo) => {
        switch (idTipoVehiculo) {
            case 1:
                return 'Automóvil';
            case 2:
                return 'Motocicleta';
            case 3:
                return 'Bicicleta';
            case 4:
                return 'Camión';
            case 5:
                return 'Autobús';
            case 6:
                return 'Minibús';
            case 7:
                return 'Misceláneo';
            default:
                return ''; // Si el ID no coincide con ninguno de los valores anteriores, no se muestra nada
        }
    };

    const formattedDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
        });
    };
    return (
        <div>
            <h5>{getTipoVehiculoText(carData.Tipo_Vehiculo_idTipo_Vehiculo)}</h5>
            <div className="d-flex justify-content-center m-4">
                <img
                    src={carData.Url_imagen === 'defaultVehicle' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7' : carData.Url_imagen}
                    className="img-fluid"
                    alt="Imagen del vehiculo"
                    style={{ width: '600px', height: '300px', objectFit: 'cover' }}
                />
            </div>
            <p><strong>Descripcion:</strong> {carData.Descripcion}</p>
            <p><strong>Placa:</strong> {carData.Placa}</p>
            <p><strong>Color:</strong> {carData.Color}</p>
            <p><strong>Marca:</strong> {carData.Marca}</p>
            <p><strong>Dueño:</strong><a href={`/dashboard/options/users/${carData.usuario_idUsuario}`} target="_blank"> {carData.Nombres} {carData.Primer_Apellido} {carData.Segundo_Apellido}</a></p>
            <p><strong>Fecha Creación:</strong> {formattedDate(carData.Fecha_Creacion)}</p>
            <p><strong>Fecha Actualización:</strong> {formattedDate(carData.Fecha_Actualizacion)}</p>

            {carData.Estado === 0 &&
                <div>
                    <div className="alert alert-danger" role="alert">
                        ACTUALMENTE ESTE VEHICULO SE ENCUENTRA ELIMINADO
                    </div>
                    <div className="alert alert-success" role="success">
                        Estado Activo
                    </div>
                </div>
            }
            <div className="d-flex justify-content-between">
                <Button color="primary" onClick={deleteImage}>
                    Quitar Imagen
                </Button>
                <Link href={`/dashboard/options/vehicles/${carData.idVehiculo}`} >
                    <Button color="warning">
                        Modificar
                    </Button>
                </Link>
                <Button color="danger" onClick={toggle}>
                    Eliminar
                </Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader>Aceptas esta accion?</ModalHeader>
                    <ModalBody>Estas seguro?</ModalBody>
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
        </div>
    )
}

export default VehicleProfile;
