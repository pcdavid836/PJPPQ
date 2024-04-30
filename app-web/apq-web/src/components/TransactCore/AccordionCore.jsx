"use client";
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { BsChevronDown, BsCarFrontFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import axios from 'axios';


function AccordionCore({ transactCards }) {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(Array(transactCards.length).fill(false));
    //console.log(transactCards);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    const toggle = () => setModal(!modal);

    const toggle2 = () => setModal2(!modal2);

    const handleClick = (index) => {
        const updatedVisibility = [...isVisible];
        updatedVisibility[index] = !updatedVisibility[index];
        setIsVisible(updatedVisibility);
    }

    const getAlertType = (transactCard) => {
        if (transactCard.PV_Cancelado === 1) {
            return 'danger';
        } else if (transactCard.PV_Estado === 0 && transactCard.PV_ConfirmacionSalida === 1) {
            return 'success';
        } else {
            return 'light';
        }
    };

    const getAlertMessage = (transactCard) => {
        if (transactCard.PV_Cancelado === 1) {
            return 'Reserva cancelada';
        } else if (transactCard.PV_Estado === 0 && transactCard.PV_ConfirmacionSalida === 1) {
            return 'Detalles de la transacción';
        } else {
            return 'Transacción en proceso';
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

    const formattedTime = (time) => {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    const formattedOnlyDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
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

    // Dentro de tu componente AccordionCore
    const getMessage = () => {
        if (transactCard.PV_ConfirmacionEntrada === 1 && transactCard.PV_ConfirmacionSalida === 1) {
            return <strong style={{ color: 'green' }}>El vehículo se retiró del parqueo exitosamente!</strong>;
        } else if (transactCard.PV_Cancelado === 1) {
            return <strong style={{ color: 'red' }}>La reserva y estacionamiento del vehículo fueron cancelados por el establecimiento.</strong>;
        } else if (transactCard.PV_Estado === 0) {
            return <strong>El vehículo aún se encuentra en el parqueo.</strong>;
        }
        return null; // Si no se cumple ninguna condición, no se muestra nada
    };




    return (
        <div>
            {transactCards.map((transactCard, index) => (
                <div className="card mb-4" key={index}>
                    <button className="btn btn-dark w-100 fs-5 d-flex align-items-center justify-content-between" onClick={() => handleClick(index)}>
                        <span>Reserva {getTipoVehiculoText(transactCard.Vehiculo_Tipo_Vehiculo_idTipo_Vehiculo)} ({formattedOnlyDate(transactCard.Reserva_Fecha_Reserva)})</span>
                        <BsChevronDown />
                    </button>
                    {isVisible[index] && (
                        <div className="card-body">
                            <p><strong>ID de Reserva:</strong> {transactCard.idReserva}</p>
                            <p><strong>Parqueo:</strong> <a href={`/dashboard/options/users/${transactCard.Reserva_Usuario_idUsuario}`} target="_blank" rel="noopener noreferrer"> {transactCard.Parqueo_Titulo}</a></p>
                            <p><strong>Usuario Que solicito la reserva:</strong><a href={`/dashboard/options/parks/profileView/${transactCard.parqueo_idParqueo}`} target="_blank" rel="noopener noreferrer"> {transactCard.Usuario_Nombres} {transactCard.Usuario_Primer_Apellido} {transactCard.Usuario_Segundo_Apellido} </a> </p>
                            <div className='mb-3 mt-3'>
                                <Button color="primary" onClick={toggle}>Ver detalles del vehiculo</Button>
                                <Modal isOpen={modal} toggle={toggle}>
                                    <ModalHeader toggle={toggle}>{getTipoVehiculoText(transactCard.Vehiculo_Tipo_Vehiculo_idTipo_Vehiculo)}</ModalHeader>
                                    <ModalBody>
                                        <img
                                            src={transactCard.Vehiculo_Url_imagen === 'defaultVehicle' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe' : transactCard.Vehiculo_Url_imagen}
                                            className="img-fluid"
                                            alt="..."
                                            style={{ width: '600px', height: '300px', objectFit: 'cover' }}
                                        />
                                        <p><strong>Informacion del vehiculo:</strong> <a href={`/dashboard/options/vehicles/profileView/${transactCard.Vehiculo_idVehiculo}`} target="_blank" rel="noopener noreferrer"> Hacer clic aqui </a></p>
                                        <p><strong>Placa:</strong> {transactCard.Vehiculo_Placa}</p>
                                        <p><strong>Color:</strong> {transactCard.Vehiculo_Color}</p>
                                        <p><strong>Marca:</strong> {transactCard.Vehiculo_Marca}</p>
                                        <p><strong>Descripción:</strong> {transactCard.Vehiculo_Descripcion}</p>
                                        <p><strong>Estado de Vehículo:</strong> {transactCard.Vehiculo_Estado === 1 ? 'Activo' : 'Eliminado'}</p>
                                        <p><strong>Fecha de Creación de Vehículo:</strong> {formattedDate(transactCard.Vehiculo_Fecha_Creacion)}</p>
                                        <p><strong>Fecha de Actualización de Vehículo:</strong> {formattedDate(transactCard.Vehiculo_Fecha_Actualizacion)}</p>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div className="d-flex justify-content-between">

                                        </div>
                                    </ModalFooter>
                                </Modal>
                            </div>
                            <p style={{ color: transactCard.Reserva_Estado === 1 ? 'orange' : 'inherit' }}>
                                <strong>Estado de la reserva: </strong>{transactCard.Reserva_Estado === 1 ? 'Pendiente' : 'Terminado'}
                            </p>
                            <p><strong>Fecha de Reserva:</strong> {formattedOnlyDate(transactCard.Reserva_Fecha_Reserva)}</p>
                            <p><strong>Hora de Inicio de la Reserva:</strong> {formattedTime(transactCard.Reserva_Hora_Reserva_Inicio)}</p>
                            <p><strong>Hora de Fin de la Reserva:</strong> {formattedTime(transactCard.Reserva_Hora_Reserva_Fin)}</p>
                            <p style={{ color: transactCard.Reserva_Rechazado === 1 ? 'red' : 'inherit' }}>
                                <strong>
                                    {transactCard.Reserva_Rechazado === 1
                                        ? 'El dueño del establecimiento canceló la reserva.'
                                        : ''}
                                </strong>
                            </p>
                            <p style={{ color: transactCard.Reserva_Cancelado === 1 ? 'red' : 'inherit' }}>
                                <strong>
                                    {transactCard.Reserva_Cancelado === 1
                                        ? 'El usuario que solicitó el parqueo canceló esta reserva.'
                                        : ''}
                                </strong>
                            </p>
                            <p><strong>Fecha de Creación de la Reserva:</strong> {formattedDate(transactCard.Reserva_Fecha_Creacion)}</p>
                            <p><strong>Fecha de Actualización de la Reserva:</strong> {formattedDate(transactCard.Reserva_Fecha_Actualizacion)}</p>
                            {/*<div className="d-flex justify-content-between">

                            </div>*/}
                            <div className={`alert alert-${getAlertType(transactCard)}`}>
                                <h3>{getAlertMessage(transactCard)}</h3>
                            </div>
                            {transactCard.PV_Cancelado === 1 && (
                                <div>
                                    {/*Si se quiere añadir un mensaje o datos extra aqui*/}
                                </div>
                            )}
                            {transactCard.PV_Estado === 0 && transactCard.PV_ConfirmacionSalida === 1 && (
                                <div>
                                    <div className='d-flex justify-content-center m-4'>
                                        <img
                                            src={transactCard.PV_Url_imagen_ingreso === 'defaultVehicle' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/VehicleImages%2Fvehicle_default.jpg?alt=media&token=a9055e84-5ca2-49cc-a4ee-9dab61d076fe' : transactCard.PV_Url_imagen_ingreso}
                                            className="img-fluid"
                                            alt="..."
                                            style={{ width: '600px', height: '300px', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <p><strong>Ultimo registro de modificacion:</strong> {formattedDate(transactCard.PV_Fecha_Actualizacion)}</p>
                                    <p><strong>Hora de Ingreso Real:</strong> {formattedTime(transactCard.PV_Hora_Ingreso)}</p>
                                    <p><strong>Hora de Salida Real:</strong> {formattedTime(transactCard.PV_Hora_Salida)}</p>
                                    {transactCard.PV_ConfirmacionEntrada === 1 && transactCard.PV_ConfirmacionSalida === 1 && transactCard.PV_Cancelado === 0 && (
                                        <p><strong style={{ color: 'green' }}>El vehículo se retiró del parqueo exitosamente!</strong></p>
                                    )}
                                    {transactCard.PV_ConfirmacionEntrada === 0 && transactCard.PV_ConfirmacionSalida === 0 && transactCard.PV_Cancelado === 1 && (
                                        <p><strong style={{ color: 'red' }}>La reserva y estacionamiento del vehículo fueron cancelados por el establecimiento.</strong></p>
                                    )}
                                    {transactCard.PV_Estado === 1 && (
                                        <p><strong style={{ color: 'black' }}>El vehículo aún se encuentra en el parqueo.</strong></p>
                                    )}
                                    {transactCard.QR_idQR && (
                                        <div className='d-flex justify-content-center m-4'>
                                            <Button color="success" onClick={toggle2}>
                                                Pago con QR
                                            </Button>
                                            <Modal isOpen={modal2} toggle={toggle2} >
                                                <ModalHeader toggle={toggle2}>Transaccion con QR</ModalHeader>
                                                <ModalBody>
                                                    <p><strong>ID de QR:</strong> {transactCard.QR_idQR}</p>
                                                    <p><strong>Monto de QR:</strong> {transactCard.QR_Monto}</p>
                                                    <p><strong>Comprobante de QR:</strong> {transactCard.QR_Comprobante}</p>
                                                    <p><strong>ID de Parqueo-Vehículo de QR:</strong> {transactCard.QR_idParqueo_Vehiculo}</p>
                                                    <p><strong>Estado de QR:</strong> {transactCard.QR_Estado}</p>
                                                    <p><strong>Confirmación de QR:</strong> {transactCard.QR_Confirmacion}</p>
                                                </ModalBody>
                                                <ModalFooter>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))
            }
        </div>
    );
}

export default AccordionCore;
