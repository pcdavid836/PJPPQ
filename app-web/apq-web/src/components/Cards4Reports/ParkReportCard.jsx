'use client';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { DemoMap } from '../DemoMap/Demo';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function ParkReportCard({ place }) {

    console.log(place)
    const router = useRouter();

    let mainImage = place.Url_imagen;

    if (mainImage === 'defaultPark') {
        mainImage = "https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7";
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

    ParkReportCard
    return (
        <div className='col d-flex justify-content-center'>
            <div className="card" style={{ width: '18rem', height: 'auto', overflow: 'auto' }}>
                <div className="card-header text-center">
                    <h5>{role}</h5>
                </div>
                {/*<DemoMap mainlat={place.Latitud} mainlng={place.Longitud} />*/}
                <img
                    src={mainImage}
                    className="card-img-top rounded-circle mx-auto mt-3"
                    alt="none Image"
                    style={{ width: '100px', height: '100px' }}
                />
                <div className="card-body">
                    <h5 className="card-title">{place.Titulo}</h5>
                    <p className="card-text">{place.Ubicacion}</p>
                    <p className="card-text"><strong> Cantidad de reportes: </strong>{place.reporte_count}</p>
                </div>

                <div className="card-footer text-center">
                    <Link href={`/dashboard/options/reports/park/${place.idParqueo}`} >
                        <Button color="secondary">
                            Ver Reportes
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ParkReportCard;
