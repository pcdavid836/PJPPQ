'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function VehicleCard({ car }) {
    const [reqName, setReqName] = useState({
        Placa: "",
        Color: "",
        Marca: "",
    });

    const [toDeny, setToDeny] = useState({
        Estado: 0,
    });

    const router = useRouter();

    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [nestedModalReject, setNestedModalReject] = useState(false);

    const [closeAll, setCloseAll] = useState(false);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };

    const toggleNestedReject = () => {
        setNestedModalReject(!nestedModalReject);
        setCloseAll(true);
    };

    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };

    const toggle = () => setModal(!modal);

    const [toDelete, setToDelete] = useState({
        Estado: 0,
    });

    let mainImage = car.Url_imagen;
    let role = ""

    switch (car.Tipo_Vehiculo_idTipo_Vehiculo) {
        case 1:
            role = "Automóvil";
            break;
        case 2:
            role = "Motocicleta";
            break;
        case 3:
            role = "Bicicleta";
            break;
        case 4:
            role = "Camión";
            break;
        case 5:
            role = "Autobus";
            break;
        case 6:
            role = "Minibus";
            break;
        case 7:
            role = "Otros";
            break;
        default:
            role = "Automóvil";
            break;
    }

    //console.log(mainImage);

    if (mainImage === 'defaultVehicle') {
        mainImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe";
    }

    const [toDefault, setToDefault] = useState({
        Url_imagen: 'defaultVehicle',
    });

    const imageBack = async () => {
        setToDefault({ Url_imagen: 'default' });
        const res = await axios.put("/api/vehicles/" + car.idVehiculo, toDefault);
        console.log(res);
        toggle();
        router.refresh();
    }

    const deleteVehicle = async () => {
        setToDelete({ Estado: 0 });
        const res = await axios.put("/api/vehicles/" + car.idVehiculo, toDelete);
        toggleAll(true);
        router.refresh();
    }



    return (
        <div className='col d-flex justify-content-center'>
            <div className="card" style={{ width: '18rem', height: 'auto', overflow: 'auto' }}>
                <img
                    src={car.Url_imagen === 'defaultVehicle' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe' : car.Url_imagen}
                    className="img-fluid"
                    alt="..."
                    style={{ width: '600px', height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{role}</h5>
                    <p className="card-text"><strong>Placa:</strong> {car.Placa}</p>
                </div>

                <div className="card-footer text-center">
                    <Button color="secondary" onClick={toggle}>
                        Opciones
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
                        <ModalHeader toggle={toggle} className="text-center">{role}</ModalHeader>
                        <ModalBody className='m-2'>
                            <div>
                                <img
                                    src={car.Url_imagen === 'defaultVehicle' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe' : car.Url_imagen}
                                    className="img-fluid"
                                    alt="..."
                                    style={{ width: '600px', height: '300px', objectFit: 'cover' }}
                                />
                                <p><strong>Id:</strong> {car.idVehiculo}</p>
                                <p><strong>Placa:</strong> {car.Placa}</p>
                                <p><strong>Color:</strong> {car.Color}</p>
                                <p><strong>Marca:</strong> {car.Marca}</p>
                                <p><strong>Dueño:</strong> {car.Nombres} {car.Primer_Apellido} {car.Segundo_Apellido}</p>
                                <p><strong>Descripcion:</strong> {car.Descripcion}</p>
                                <p><strong>Fecha de Creacion:</strong> {new Date(car.Fecha_Creacion).toLocaleString()}</p>
                                <p><strong>Ultima Modificacion:</strong> {new Date(car.Fecha_Actualizacion).toLocaleString()}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            <Button color="primary" onClick={imageBack}>
                                Quitar Imagen
                            </Button>
                            <Link href={`/dashboard/options/vehicles/vehiclesMOD/${car.idVehiculo}`} >
                                <Button color="warning" onClick={toggle}>
                                    Modificar
                                </Button>
                            </Link>
                            <Button color="danger" onClick={toggleNestedReject}>
                                Eliminar
                            </Button>
                            <Modal
                                isOpen={nestedModalReject}
                                toggle={toggleNestedReject}
                                onClosed={closeAll ? toggleNested : undefined}
                            >
                                <ModalHeader>Aceptas esta accion?</ModalHeader>
                                <ModalBody>Estas seguro?</ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={deleteVehicle}>
                                        Si
                                    </Button>{' '}
                                    <Button color="secondary" onClick={toggleNestedReject}>
                                        No
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </ModalFooter>

                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard;
