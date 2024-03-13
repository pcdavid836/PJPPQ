'use client';
import { Map } from '@/components/MainMap/Map';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';


function ParkPage() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [toVault, setToVault] = useState({
    Estado: 0,
  });
  const [toImage, setImage] = useState({
    Url_imagen: 'defaultPark',
  });
  const [tool, setTool] = useState({
    mainId: 0,
  });
  const router = useRouter();

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);


  const handleSelectPark = async (park) => {
    setSelectedPark(park);
    setTool({ mainId: park.idParqueo });

    // Obtén los horarios de atención del parqueo seleccionado
    const response = await axios.get(`/api/schedules/${park.idParqueo}`);
    setSchedules(response.data);

    const userResponse = await axios.get(`/api/users/${park.usuario_idUsuario}`);
    setUserDetails(userResponse.data);
  };

  const moveToVault = async () => {
    setToVault({ Estado: 0 });
    const res = await axios.put("/api/parks/" + tool.mainId, toVault);
    window.location.reload();
  }

  const deleteImage = async () => {
    setImage({ Url_imagen: 'defaultPark' });
    const res = await axios.put("/api/parks/" + tool.mainId, toImage);
    window.location.reload();
  }



  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Parqueos en Cochabamba</h1>
          <div className="btn-toolbar mb-2 mb-md-0"></div>
        </div>
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0 d-flex">
              <div style={{ width: '100%', height: '100%' }}>
                <h3 className="pb-3">SELECCIONE UNA LOCACION</h3>
                <Map onSelectPark={handleSelectPark} />
                <Link href={'/dashboard/options/parks/ListMode'}>
                  <div className="d-grid gap-2 pt-2 pb-2">
                    <button className="btn btn-primary" type="button">
                      Modo Lista
                    </button>
                  </div>
                </Link>
                <Link href={'/dashboard/options/parks/parksVault'}>
                  <div className="d-grid gap-2 pb-2">
                    <button className="btn btn-success" type="button">
                      Baul de Parqueos
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <h3>Informacion parqueo Seleccionado</h3>
              {selectedPark && (
                <div>
                  <h5>{selectedPark.Titulo}</h5>
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={selectedPark.Url_imagen === 'defaultPark' ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/GarageImages%2FdefaulttPark.jpg?alt=media&token=829c6cfc-bfda-45ef-a172-7f6086d260c7' : selectedPark.Url_imagen}
                      className="img-fluid"
                      alt="..."
                      style={{ width: '500px', height: '250px', objectFit: 'cover' }}
                    />
                  </div>
                  <p>{selectedPark.Descripcion}</p>
                  <p><strong>Tamaño:</strong> {selectedPark.Tamaño}m2</p>
                  <p><strong>Dueño:</strong> {userDetails && `${userDetails.Nombres} ${userDetails.Primer_Apellido} ${userDetails.Segundo_Apellido}`}</p>
                  <p><strong>Documento:</strong><a href={selectedPark.Url_validacion} target="_blank"> Ver archivo</a></p>
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
                  <div className="d-flex pt-2 pb-2">

                    <Link href={`/dashboard/options/parks/${selectedPark.idParqueo}`} className="w-50 pe-2">
                      <button className="btn btn-warning w-100" type="button">
                        Modificar
                      </button>
                    </Link>
                    <Button className="btn w-50" color="danger" onClick={toggle}>
                      Mover al Baul
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalHeader toggle={toggle}>Mover al baul</ModalHeader>
                      <ModalBody>
                        Estas seguro?
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

                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ParkPage;
