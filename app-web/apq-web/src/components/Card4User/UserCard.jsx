'use client';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function UserCard({ user }) {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);



    const [toBan, setToBan] = useState({
        Ban: 1,
    });

    const [toDefault, setToDefault] = useState({
        Url_imagen: 'default',
    });

    const [closeAll, setCloseAll] = useState(false);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
        setCloseAll(false);
    };

    const toggleAll = () => {
        setNestedModal(!nestedModal);
        setCloseAll(true);
    };

    const toggle = () => setModal(!modal);

    let mainImage = user.Url_imagen;
    let role = ""

    switch (user.Tipo_Usuario_idTipo_Usuario) {
        case 1:
            role = "Usuario";
            break;
        case 2:
            role = "Cuidador";
            break;
        default:
            role = "Usuario";
            break;
    }

    //console.log(mainImage);

    if (mainImage === 'default') {
        mainImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323";
    }


    const banUser = async () => {
        setToBan({ Ban: 1 });
        const res = await axios.put("/api/users/" + user.idUsuario, toBan);
        toggleAll(true);
        router.refresh();
    }

    const imageBack = async () => {
        setToDefault({ Url_imagen: 'default' });
        const res = await axios.put("/api/users/" + user.idUsuario, toDefault);
        console.log(res);
        toggle();
        router.refresh();
    }

    return (
        <div className='col'>
            <div className="card m-3 h-100">
                <div className="card-header text-center">
                    <h5>{role}</h5>
                </div>
                <img
                    src={mainImage}
                    className="card-img-top rounded-circle mx-auto mt-3"
                    alt="none Image"
                    style={{ width: '100px', height: '100px' }}
                />
                <div className="card-body text-center">
                    <h6 className="card-title">{user.Correo}</h6>
                    <p className="card-text">
                        {user.Nombres} {user.Primer_Apellido} {user.Segundo_Apellido}
                    </p>
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
                                    src={mainImage}
                                    className="card-img-top rounded-circle mx-auto mb-3"
                                    alt="none Image"
                                    style={{ width: '200px', height: '200px' }}
                                />
                                <p><strong>Id:</strong> {user.idUsuario}</p>
                                <p><strong>Nombre completo:</strong> {user.Nombres} {user.Primer_Apellido} {user.Segundo_Apellido}</p>
                                <p><strong>Correo:</strong> {user.Correo}</p>
                                <p><strong>Celular:</strong> {user.Celular}</p>
                                <p><strong>CI:</strong> {user.CI}</p>
                                <p><strong>Creacion de Cuenta:</strong> {new Date(user.FechaCreacion).toLocaleString()}</p>
                                <p><strong>Ultima Modificacion:</strong> {new Date(user.FechaActualizacion).toLocaleString()}</p>
                            </div>
                        </ModalBody>
                        <ModalFooter className="justify-content-between">
                            <Link href={`/dashboard/options/users/userVehicles/${user.idUsuario}`}>
                                <Button color="info" onClick={toggle}>
                                    Ver vehiculos
                                </Button>
                            </Link>
                            <Button color="warning" onClick={imageBack}>
                                Quitar Imagen
                            </Button>
                            <Button color="danger" onClick={toggleNested}>
                                Banear usuario
                            </Button>
                            <Modal
                                isOpen={nestedModal}
                                toggle={toggleNested}
                                onClosed={closeAll ? toggle : undefined}
                            >
                                <ModalHeader>Aprobar Solicitud</ModalHeader>
                                <ModalBody>Estas seguro?</ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={banUser}>
                                        Si
                                    </Button>{' '}
                                    <Button color="secondary" onClick={toggleNested}>
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

export default UserCard;
