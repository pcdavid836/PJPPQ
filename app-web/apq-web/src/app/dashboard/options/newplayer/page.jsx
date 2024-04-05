'use client';
import { useState, useRef } from 'react'
import axios from 'axios'

function NewPlayerPage() {

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [user, setUser] = useState({
    Correo: "",
    Nombres: "",
    Primer_Apellido: "",
    Segundo_Apellido: "",
    Celular: "",
    CI: "",
    Contrasena: "default",
    Estado: 0,
    Url_Imagen: "default",
    Tipo_Usuario_idTipo_Usuario: 3
  });

  const form = useRef(null);
  let completeCi = "";

  const handleChange = e => {
    //console.log(e.target.value, e.target.name);
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const [expeditionPlace, setExpeditionPlace] = useState("NA");

  const handleSelectChange = e => {
    setExpeditionPlace(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in user) {
      if (user[key] === "") {
        setErrorMessage(`Por favor, llena el campo ${key}.`);
        return;
      }
    }

    if (expeditionPlace === "NA" || expeditionPlace === null) {
      setErrorMessage('Por favor, seleccione un lugar de expedición de tu cedula de identidad.');
    }
    else {
      completeCi = user.CI;
      user.CI = completeCi + expeditionPlace;
      let passport = "";
      let charBase = user.Url_Imagen.length;
      let charSi = user.Url_Imagen.length;

      let date = new Date();
      let min = date.getMinutes();
      let numbers = min * charBase + charSi * 10000 - 34;
      passport = numbers.toString();



      const res = await axios.post('/api/users', user);
      //console.log(res);


      const emailResponse = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo: passport }),
      });

      form.current.reset();
      // Reset user state
      setUser({
        Correo: "",
        Nombres: "",
        Primer_Apellido: "",
        Segundo_Apellido: "",
        Celular: "",
        CI: "",
        Contrasena: "default",
        Estado: 0,
        Url_Imagen: "default",
        Tipo_Usuario_idTipo_Usuario: 3
      });
      completeCi = "";
      setExpeditionPlace("");

      setSuccessMessage('Usuario registrado! Comunica acerca su nuevo inicio de sesion');
    }

  };

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Registrar un nuevo admin</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
        <div className='p-2'>
          <form onSubmit={handleSubmit} ref={form} >
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="Nombres" aria-label="First name" name="Nombres" onChange={handleChange} maxLength="45" pattern="[a-zA-ZñÑ ]*" title="Las letras son los unicos caracteres validos." />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Apellido Paterno" aria-label="Last name" name="Primer_Apellido" onChange={handleChange} maxLength="45" pattern="[a-zA-ZñÑ]*" title="Las letras son los unicos caracteres validos." />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Apellido Materno" aria-label="Second Last name" name="Segundo_Apellido" onChange={handleChange} maxLength="45" pattern="[a-zA-ZñÑ]*" title="Las letras son los unicos caracteres validos." />
              </div>
            </div>
            <div className="col-auto pt-3">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Número de Cedula de Identidad" pattern="[0-9]*" name="CI" onChange={handleChange} title="Ingrese solo números." maxLength="8" />
                <select className="form-select" onChange={handleSelectChange}>
                  <option defaultValue value="NA">Lugar de expedicion...</option>
                  <option value="CB">CB</option>
                  <option value="LP">LP</option>
                  <option value="SC">SC</option>
                  <option value="TJ">TJ</option>
                  <option value="CH">CH</option>
                  <option value="OR">OR</option>
                  <option value="PT">PT</option>
                  <option value="PA">PA</option>
                  <option value="BN">BN</option>
                  <option value="CIE">CIE</option>
                </select>
              </div>
            </div>
            <div className="row g-3 pt-3">
              <div className="col-sm">
                <input type="text" className="form-control" placeholder="Correo Electronico" aria-label="Email" name="Correo" onChange={handleChange} />
              </div>
              <div className="col-sm">
                <input type="text" pattern="[0-9]*" className="form-control" placeholder="Número de Celular" aria-label="PhoneNumber" name="Celular" onChange={handleChange} title="Ingrese solo números." maxLength="9" />
              </div>
            </div>
            <div className="d-grid pt-3 pb-3 gap-2">
              <button className="btn btn-success" type="submit">Registrar nuevo administrador</button>
            </div>
            {errorMessage && <div className="alert alert-danger" role="alert" >{errorMessage}</div>}

            {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}

          </form>
        </div>
      </main>
    </div>
  )
}

export default NewPlayerPage