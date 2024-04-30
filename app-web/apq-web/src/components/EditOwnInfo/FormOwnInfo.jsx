"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';


// Aquí separamos la consulta de axios en una nueva función
async function fetchUserData(email) {
  if (email) {
    const { data } = await axios.post(`/api/owninfo`, { Correo: email });
    return data;
  }
  console.log('Email is undefined');
  return null;
}

function FormOwnInfo({ email }) {
  const [userData, setUserData] = useState(null);
  const [userMod, setUserMod] = useState({
    Nombres: "",
    Primer_Apellido: "",
    Segundo_Apellido: "",
    CI: "",
    Celular: ""
});

  useEffect(() => {
    // Llamamos a la nueva función dentro del useEffect
    fetchUserData(email).then(data => {
      setUserData(data);
    });
  }, [email]); // Pasamos email como dependencia para que se ejecute solo cuando cambie el email

  // Si userData es null, mostramos un mensaje de carga
  if (!userData) {
    return <p>Cargando datos del usuario...</p>;
  }

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value
    });
  };

  // Función para manejar el clic en el botón "Registrar"
  const handleUpdateClick = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe
    //console.log(userData); // Imprime userData en la consola

    userMod.Nombres = userData.Nombres;
    userMod.Primer_Apellido = userData.Primer_Apellido;
    userMod.Segundo_Apellido = userData.Segundo_Apellido;
    userMod.CI = userData.CI;
    userMod.Celular = userData.Celular;

    console.log(userMod); // Imprime userData en la consola

    try {
      // Actualizar los datos del usuario
      const res = await axios.put(`/api/owninfo/${userData.idUsuario}`, userMod);
      console.log(res);

      // Refrescar los datos del usuario
      const updatedUserData = await fetchUserData(email);
      setUserData(updatedUserData);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  // Si userData no es null, mostramos los datos del usuario
  return (
    <div className="container py-5 h-100 custom-container">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="card" style={{ borderRadius: '15px' }}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4 d-flex justify-content-center">
              <img src={userData.Url_Imagen === 'default' || userData.Url_Imagen === null ? 'https://firebasestorage.googleapis.com/v0/b/pkpq-74307.appspot.com/o/ProfileImages%2Fuser_default.png?alt=media&token=d6b24730-d87d-4be5-9275-df4a44f5c323' : userData.Url_Imagen}
                className="rounded-circle img-fluid" style={{ width: '100px' }} alt="User" />
            </div>

            <h4 className="mb-2">Tus datos</h4>
            <p className="text-muted mb-4">Puedes editar tu informacion :D</p>
            <div className="mb-4 pb-2">
              {/* formulario */}
              <form>
                <div className="row">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Nombres" aria-label="First name" name="Nombres" value={userData.Nombres} onChange={handleChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Apellido Paterno" aria-label="Last name" name="Primer_Apellido" value={userData.Primer_Apellido} onChange={handleChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Apellido Materno" aria-label="Second last name" name="Segundo_Apellido" value={userData.Segundo_Apellido} onChange={handleChange} />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Correo" aria-label="Email" name="Correo" value={userData.Correo} onChange={handleChange} />
                  </div>
                  <div className="col">
                    <input type="text" className="form-control" placeholder="Celular" aria-label="Cellphone" name="Celular" value={userData.Celular} onChange={handleChange} />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <input type="text" className="form-control" placeholder="CI" aria-label="CI" name="CI" value={userData.CI} onChange={handleChange} />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <button type="submit" className="btn btn-primary" onClick={handleUpdateClick}>Actualizar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FormOwnInfo;
