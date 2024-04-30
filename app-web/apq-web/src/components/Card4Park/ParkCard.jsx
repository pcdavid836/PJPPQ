'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DemoMap } from '../DemoMap/Demo';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function ParkCard({ place }) {
    const [reqName, setReqName] = useState({
        Nombres: "",
        Primer_Apellido: "",
        Segundo_Apellido: "",
    });

    const [modal2, setModal2] = useState(false);

    const [toImage, setImage] = useState({
        Url_imagen: 'defaultPark',
    });

    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        axios.get('/api/users/' + place.usuario_idUsuario)
            .then(res => {
                setReqName({
                    Nombres: res.data.Nombres,
                    Primer_Apellido: res.data.Primer_Apellido,
                    Segundo_Apellido: res.data.Segundo_Apellido
                })
            })
        // Obtén los horarios de atención
        axios.get('/api/schedules/' + place.idParqueo)
            .then(res => {
                setSchedules(res.data);
            })
    }, [place.usuario_idUsuario, place.idParqueo]);


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
    const toggle2 = () => setModal2(!modal2);


    async function addHorariosAtencion(parqueoId, horaApertura, horaCierre) {
        // Loop over each day of the week
        for (let diasSemanaIdDia = 1; diasSemanaIdDia <= 7; diasSemanaIdDia++) {
            // Prepare the data to be sent
            const data = {
                parqueo_idParqueo: parqueoId,
                dias_semana_idDia: diasSemanaIdDia,
                hora_apertura: horaApertura,
                hora_cierre: horaCierre,
                Estado: 0
            };

            // Send the POST request
            const res = await axios.post('/api/requests', data);

            //console.log(res.data);
        }
    }

    const deleteImage = async () => {
        setImage({ Url_imagen: 'defaultPark' });
        const res = await axios.put("/api/parks/" + place.idParqueo, toImage);
        //console.log(res);
        toggle2();
        router.refresh();
    }

    const moveToVault = async () => {
        setToDeny({ Estado: 0 }); // Use setToAprobe to update the state
        const res = await axios.put("/api/parks/" + place.idParqueo, toDeny);
        //console.log(res);
        toggle(); // This will close all modals immediately
        router.refresh();
    }


    let role = ""

    switch (place.Tipo_Parqueo_idTipo_Parqueo) {
        case 1:
            role = "Privado";
            break;
        case 2:
            role = "Publico";
            break;
        case 3:
            role = "Taller mecanico";
            break;
        case 4:
            role = "Taller de bicicletas";
            break;
        default:
            role = "Privado";
            break;
    }


    return (
        <div className='col d-flex justify-content-center'>
            <div className="card" style={{ width: '18rem', height: 'auto', overflow: 'auto' }}>
                <DemoMap mainlat={place.Latitud} mainlng={place.Longitud} />
                <div className="card-body">
                    <h5 className="card-title">{place.Titulo}</h5>
                    <p className="card-text">{place.Ubicacion}</p>
                </div>

                <div className="card-footer text-center">
                    <Button color="secondary" onClick={toggle}>
                        Opciones
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} className="modal-dialog-centered">
                        <ModalHeader toggle={toggle} className="text-center">{place.Titulo}</ModalHeader>
                        <ModalBody className='m-2'>
                            <div>
                                <img
                                    src={place.Url_imagen === 'defaultPark' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7' : place.Url_imagen}
                                    className="img-fluid"
                                    alt="..."
                                    style={{ width: '500px', height: '250px', objectFit: 'cover' }}
                                />
                                <p><strong>Id:</strong> {place.idParqueo}</p>
                                <p><strong>Tipo de parqueo:</strong> {role}</p>
                                <p><strong>Dueño:</strong> <Link href={`/dashboard/options/users/${place.usuario_idUsuario}`} >{reqName.Nombres} {reqName.Primer_Apellido} {reqName.Segundo_Apellido}</Link></p>
                                <p><strong>Ubicacion:</strong> {place.Ubicacion}</p>
                                <p><strong>Descripcion:</strong> {place.Descripcion}</p>
                                <p><strong>Tamaño:</strong> {place.Tamaño} m2</p>
                                <p><strong>Creacion de Cuenta:</strong> {new Date(place.Fecha_Creacion).toLocaleString()}</p>
                                <p><strong>Ultima Modificacion:</strong> {new Date(place.Fecha_Actualizacion).toLocaleString()}</p>
                                <p><strong>Documento:</strong><a href={place.Url_validacion} target="_blank"> Ver archivo</a></p>
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
                                        {schedules.map((schedule, index) => {
                                            let day;
                                            switch (schedule.dias_semana_idDia) {
                                                case 1:
                                                    day = 'Lunes';
                                                    break;
                                                case 2:
                                                    day = 'Martes';
                                                    break;
                                                case 3:
                                                    day = 'Miércoles';
                                                    break;
                                                case 4:
                                                    day = 'Jueves';
                                                    break;
                                                case 5:
                                                    day = 'Viernes';
                                                    break;
                                                case 6:
                                                    day = 'Sábado';
                                                    break;
                                                case 7:
                                                    day = 'Domingo';
                                                    break;
                                                default:
                                                    day = '';
                                            }
                                            return (
                                                <tr key={index}>
                                                    <td>{day}</td>
                                                    <td>{new Date(`1970-01-01T${schedule.hora_apertura}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td>{new Date(`1970-01-01T${schedule.hora_cierre}Z`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td>{schedule.Estado === 1 ? 'Activo' : 'Desactivado'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            <Link href={`/dashboard/options/parks/ListMode/${place.idParqueo}`} >
                                <Button color="warning" onClick={toggle}>
                                    Modificar
                                </Button>
                            </Link>
                            <Button color="secondary" onClick={toggle2}>
                                Eliminar Imagen
                            </Button>
                            <Modal isOpen={modal2} toggle={toggle2}>
                                <ModalHeader toggle={toggle2}>Eliminar Imagen?</ModalHeader>
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
                            <Button color="danger" onClick={toggleNestedReject}>
                                Mover al Baul
                            </Button>
                            <Modal
                                isOpen={nestedModalReject}
                                toggle={toggleNestedReject}
                                onClosed={closeAll ? toggle : undefined}
                            >
                                <ModalHeader>Mover al Baul</ModalHeader>
                                <ModalBody>Estas seguro?</ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={moveToVault}>
                                        Si
                                    </Button>{' '}
                                    <Button color="secondary" onClick={toggleNestedReject}>
                                        No
                                    </Button>
                                </ModalFooter>
                            </Modal>
                            <Link href={`/dashboard/options/parks/sidekicks/${place.idParqueo}`} >
                                <Button color="primary" onClick={toggle}>
                                    Lista de Ayudantes
                                </Button>
                            </Link>
                            <Link href={`/dashboard/options/parks/stunnedUsers/${place.idParqueo}`} >
                                <Button color="secondary" onClick={toggle}>
                                    Usuarios Silenciados
                                </Button>
                            </Link>
                            <Link href={`/dashboard/options/parks/parkControl/${place.idParqueo}`} >
                                <Button color="secondary" onClick={toggle}>
                                    Registro de Establecimiento
                                </Button>
                            </Link>
                        </ModalFooter>

                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default ParkCard;
