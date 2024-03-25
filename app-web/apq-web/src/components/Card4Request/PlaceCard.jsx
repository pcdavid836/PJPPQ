'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DemoMap } from '../DemoMap/Demo';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function PlaceCard({ place }) {
    console.log(place)
    const [reqName, setReqName] = useState({
        Nombres: "",
        Primer_Apellido: "",
        Segundo_Apellido: "",
    });


    const [toHelper, setToHelper] = useState({
        Tipo_Usuario_idTipo_Usuario: 2,
    });

    useEffect(() => {
        axios.get('/api/users/' + place.usuario_idUsuario)
            .then(res => {
                setReqName({
                    Nombres: res.data.Nombres,
                    Primer_Apellido: res.data.Primer_Apellido,
                    Segundo_Apellido: res.data.Segundo_Apellido
                })
            })
    }, [place.usuario_idUsuario]);

    const [toAprobe, setToAprobe] = useState({
        Aprobacion: 1,
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

            console.log(res.data);
        }
    }

    async function addSelectCarTypes(parqueoId) {
        // Loop over each day of the week
        for (let nVehicles = 1; nVehicles <= 7; nVehicles++) {
            // Prepare the data to be sent
            const data = {
                tipo_vehiculo_idTipo_Vehiculo: nVehicles,
                parqueo_idParqueo: parqueoId,
                Estado: 0
            };

            // Send the POST request
            const res = await axios.post('/api/requests/requestsTypeVehicle', data);

            //console.log(res.data);
        }
    }

    const aprobeSub = async () => {
        setToAprobe({ Aprobacion: 1 }); // Use setToAprobe to update the state
        const res = await axios.put("/api/requests/" + place.idParqueo, toAprobe);
        //console.log(res);

        addHorariosAtencion(place.idParqueo, '08:00:00', '18:00:00');
        addSelectCarTypes(place.idParqueo);
        setToHelper({ Tipo_Usuario_idTipo_Usuario: 2 });
        const res2 = await axios.put('/api/users/' + place.usuario_idUsuario, toHelper);
        //console.log(res2);


        toggleAll(true);
        router.refresh();
    }

    const denySub = async () => {
        setToDeny({ Estado: 0 }); // Use setToAprobe to update the state
        const res = await axios.put("/api/requests/" + place.idParqueo, toDeny);
        console.log(res);
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
                                <img src={place.Url_imagen} className="img-fluid pb-3" alt="..."></img>
                                <p><strong>Id:</strong> {place.idParqueo}</p>
                                <p><strong>Tipo de parqueo:</strong> {role}</p>
                                <p><strong>Dueño:</strong> {reqName.Nombres} {reqName.Primer_Apellido} {reqName.Segundo_Apellido}</p>
                                <p><strong>Ubicacion:</strong> {place.Ubicacion}</p>
                                <p><strong>Descripcion:</strong> {place.Descripcion}</p>
                                <p><strong>Tamaño:</strong> {place.Tamaño} m2</p>
                                <p><strong>Creacion de Cuenta:</strong> {new Date(place.Fecha_Creacion).toLocaleString()}</p>
                                <p><strong>Ultima Modificacion:</strong> {new Date(place.Fecha_Actualizacion).toLocaleString()}</p>
                                <p><strong>Documento:</strong><a href={place.Url_validacion} target="_blank"> Ver archivo</a></p>

                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            <Button color="success" onClick={toggleNested}>
                                Aprobar
                            </Button>
                            <Modal
                                isOpen={nestedModal}
                                toggle={toggleNested}
                                onClosed={closeAll ? toggle : undefined}
                            >
                                <ModalHeader>Aprobar Solicitud</ModalHeader>
                                <ModalBody>Estas seguro?</ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={aprobeSub}>
                                        Si
                                    </Button>{' '}
                                    <Button color="secondary" onClick={toggleNested}>
                                        No
                                    </Button>
                                </ModalFooter>
                            </Modal>
                            <Link href={`/dashboard/options/requests/${place.idParqueo}`} >
                                <Button color="warning" onClick={toggle}>
                                    Modificar
                                </Button>
                            </Link>
                            <Button color="danger" onClick={toggleNestedReject}>
                                Rechazar
                            </Button>
                            <Modal
                                isOpen={nestedModalReject}
                                toggle={toggleNestedReject}
                                onClosed={closeAll ? toggle : undefined}
                            >
                                <ModalHeader>Rechazar Solicitud</ModalHeader>
                                <ModalBody>Estas seguro?</ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={denySub}>
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

export default PlaceCard;
