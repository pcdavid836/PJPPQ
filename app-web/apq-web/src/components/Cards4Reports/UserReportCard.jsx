'use client';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function UserReportCard({ user }) {
    const router = useRouter();
    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);



    const [toBan, setToBan] = useState({
        Ban: 1,
    });

    const [toDefault, setToDefault] = useState({
        Url_Imagen: 'default',
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

    let mainImage = user.Url_Imagen;
    //console.log(user);
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

    /*
        const banUser = async () => {
            setToBan({ Ban: 1 });
            const res = await axios.put("/api/users/" + user.idUsuario, toBan);
            toggleAll(true);
            router.refresh();
        }
    
        const imageBack = async () => {
            setToDefault({ Url_Imagen: 'default' });
            const res = await axios.put("/api/users/" + user.idUsuario, toDefault);
            console.log(res);
            toggle();
            router.refresh();
        }
    */
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
                        <a href={`/dashboard/options/users/${user.idUsuario}`} target="_blank" rel="noopener noreferrer">
                            {user.Nombres} {user.Primer_Apellido} {user.Segundo_Apellido}
                        </a>
                    </p>
                    <p className="card-text">
                        Solicitudes de reporte: {user.reporte_count}
                    </p>
                </div>
                <div className="card-footer text-center">
                    <Link href={`/dashboard/options/reports/user/${user.idUsuario}`} >
                        <Button color="secondary">
                            Ver reportes del Usuario
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserReportCard;
