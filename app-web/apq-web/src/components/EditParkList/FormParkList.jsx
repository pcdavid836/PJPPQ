'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';

//OPTIMIZAR ESTO A FUTURO FormParkList - FormPark

function FormParkList({ newReqId }) {
  const [schedules, setSchedules] = useState([]);
  const [requestPark, setRequestPark] = useState({
    Ubicacion: "",
    Descripcion: "",
    Titulo: "",
    Tamaño: "",
  });

  const [errors, setErrors] = useState({
    Titulo: '',
    Ubicacion: '',
    Descripcion: '',
    Tamaño: '',
  });

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/parks/' + newReqId)
      .then(res => {
        setRequestPark({
          Ubicacion: res.data.Ubicacion,
          Descripcion: res.data.Descripcion,
          Titulo: res.data.Titulo,
          Tamaño: res.data.Tamaño
        })
      })
    axios.get(`http://localhost:3000/api/schedules/${newReqId}`)
      .then(res => {
        setSchedules(res.data);
      })
  }, [newReqId]);

  const handleCheckboxChange = (index) => {
    const newSchedules = [...schedules];
    newSchedules[index].Estado = newSchedules[index].Estado === 1 ? 0 : 1;
    setSchedules(newSchedules);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case 'Titulo':
        setErrors({ ...errors, Titulo: value.length > 45 ? 'Titulo puede tener hasta maximo 45 caracteres' : '' });
        break;
      case 'Ubicacion':
        setErrors({ ...errors, Ubicacion: value.length > 45 ? 'La Ubicacion puede tener hasta maximo 45 caracteres' : '' });
        break;
      case 'Tamaño':
        if (!/^\d+$/.test(value)) {
          setErrors({ ...errors, Tamaño: 'El tamaño debe ser un número entero' });
        } else if (value.length > 6) {
          setErrors({ ...errors, Tamaño: 'El tamaño no debe exceder de 6 caracteres' });
        } else {
          setErrors({ ...errors, Tamaño: '' });
        }
        break;
      case 'Descripcion':
        setErrors({ ...errors, [name]: value.length > 150 ? `${name} puede tener hasta un valor maximo de 150 caracteres` : '' });
        break;
      default:
        break;
    }

    setRequestPark(prevState => ({ ...prevState, [name]: value }));
  };

  const convertToBrowserTimezone = (time) => {
    const date = new Date(`1970-01-01T${time}`);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const handleTimeChange = (e, index, field) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = e.target.value;
    setSchedules(newSchedules);
  };

  const handleUpdate = async () => {
    for (const schedule of schedules) {
      console.log(schedule.idHorario);
      await axios.put(`http://localhost:3000/api/schedules/${schedule.idHorario}`, schedule);
    }
    // Aquí puedes agregar código para manejar lo que sucede después de la actualización
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(errors)) {
      // Actualizar horarios
      await handleUpdate();

      // Actualizar parqueo
      const res = await axios.put("/api/parks/" + newReqId, requestPark);
      console.log(res);
      router.push("/dashboard/options/parks/ListMode");
      router.refresh();
    } else {
      console.error('Invalid Form')
    }
  };


  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Título</Label>
        <Input
          id="title"
          name="Titulo"
          placeholder="Ingresa el titulo corregido del lugar"
          type="text"
          defaultValue={requestPark.Titulo}
          onChange={handleChange}
          invalid={errors.Titulo.length > 0}
        />
        <FormFeedback>{errors.Titulo}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="location">Ubicacion</Label>
        <Input
          id="location"
          name="Ubicacion"
          placeholder="Ingresa la ubicacion corregida del lugar"
          type="text"
          defaultValue={requestPark.Ubicacion}
          onChange={handleChange}
          invalid={errors.Ubicacion.length > 0}
        />
        <FormFeedback>{errors.Ubicacion}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="size">Tamaño m2</Label>
        <Input
          id="Tamaño"
          name="Tamaño"
          placeholder="Ingresa el tamaño corregido del lugar"
          type="number"
          defaultValue={requestPark.Tamaño}
          onChange={handleChange}
          invalid={errors.Tamaño.length > 0}
        />
        <FormFeedback>{errors.Tamaño}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="description">Descripcion</Label>
        <Input
          id="description"
          name="Descripcion"
          type="textarea"
          defaultValue={requestPark.Descripcion}
          onChange={handleChange}
          invalid={errors.Descripcion.length > 0}
        />
        <FormFeedback>{errors.Descripcion}</FormFeedback>
      </FormGroup>
      <FormGroup>
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
                  <td>
                    <input
                      type="time"
                      value={schedule.hora_apertura.slice(0, 5)}
                      onChange={(e) => handleTimeChange(e, index, 'hora_apertura')}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      value={schedule.hora_cierre.slice(0, 5)}
                      onChange={(e) => handleTimeChange(e, index, 'hora_cierre')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={schedule.Estado === 1}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </FormGroup>
      <div className="d-grid gap-2">
        <Button className='btn' style={{ backgroundColor: 'purple', color: 'white' }} onClick={handleUpdate}>Actualizar Horarios</Button>
      </div>
      <div className="d-grid gap-2 mt-3">
        <Button type="submit">Actualizar Parqueo</Button>
      </div>
    </Form>
  );
}

export default FormParkList;
