'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function FormReq({ newReqId }) {
  const [requestPark, setRequestPark] = useState({
    Ubicacion: "",
    Descripcion: "",
    Titulo: "",
  });

  const [errors, setErrors] = useState({
    Titulo: '',
    Ubicacion: '',
    Descripcion: ''
  });

  const router = useRouter();

  useEffect(() => {
    axios.get('/api/requests/' + newReqId)
      .then(res => {
        setRequestPark({
          Ubicacion: res.data.Ubicacion,
          Descripcion: res.data.Descripcion,
          Titulo: res.data.Titulo
        })
      })
  }, [newReqId]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    switch (name) {
      case 'Titulo':
        setErrors({ ...errors, Titulo: value.length > 45 ? 'Titulo puede tener hasta maximo 45 caracteres' : '' });
        break;
      case 'Ubicacion':
        setErrors({ ...errors, Ubicacion: value.length > 45 ? 'La Ubicacion puede tener hasta maximo 45 caracteres' : '' });
        break;
      case 'Descripcion':
        setErrors({ ...errors, [name]: value.length > 150 ? `${name} puede tener hasta un valor maximo de 150 caracteres` : '' });
        break;
      default:
        break;
    }

    setRequestPark(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm(errors)) {
      const res = await axios.put("/api/requests/" + newReqId, requestPark);
      console.log(res);
      router.push("/dashboard/options/requests");
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
      <div class="d-grid gap-2">
        <Button>Actualizar</Button>
      </div>
    </Form>
  );
}

export default FormReq;
