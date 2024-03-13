'use client';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function FormVeh({ newReqId }) {
    const [modifyVehicle, setModifyVehicle] = useState({
        Placa: "",
        Color: "",
        Marca: "",
        Descripcion: "",
        usuario_idUsuario: "",
    });

    const [errors, setErrors] = useState({
        Placa: '',
        Color: '',
        Marca: '',
        Descripcion: '',
        usuario_idUsuario: "",
    });

    const router = useRouter();
    useEffect(() => {
        axios.get('/api/vehicles/' + newReqId)
            .then(res => {
                setModifyVehicle({
                    Placa: res.data.Placa,
                    Color: res.data.Color,
                    Marca: res.data.Marca,
                    Descripcion: res.data.Descripcion,
                    usuario_idUsuario: res.data.usuario_idUsuario
                })
            })
    }, [newReqId]);


    const handleChange = (e) => {
        let { name, value } = e.target;

        switch (name) {
            case 'Placa':
                setErrors({ ...errors, Placa: value.length > 45 ? 'Placa puede tener hasta maximo 45 caracteres' : '' });
                break;
            case 'Color':
                setErrors({ ...errors, Color: value.length > 45 ? 'Color puede tener hasta maximo 45 caracteres' : '' });
                break;
            case 'Marca':
                setErrors({ ...errors, Marca: value.length > 45 ? 'Marca puede tener hasta maximo 45 caracteres' : '' });
                break;
            case 'Descripcion':
                setErrors({ ...errors, [name]: value.length > 150 ? `${name} puede tener hasta un valor maximo de 150 caracteres` : '' });
                break;
            default:
                break;
        }

        setModifyVehicle(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(errors)) {
            const res = await axios.put("/api/vehicles/" + newReqId, modifyVehicle);
            console.log(res);
            // Redirige al usuario después de actualizar el formulario
            router.push(`/dashboard/options/users/userVehicles/${modifyVehicle.usuario_idUsuario}`);
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
                <Label for="title">Placa</Label>
                <Input
                    id="identifier"
                    name="Placa"
                    placeholder="Ingresa la placa a corregir del vehiculo"
                    type="text"
                    defaultValue={modifyVehicle.Placa}
                    onChange={handleChange}
                    invalid={errors.Placa.length > 0}
                />
                <FormFeedback>{errors.Placa}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="color">Color</Label>
                <Input
                    id="color"
                    name="Color"
                    placeholder="Ingresa la ubicacion corregida del lugar"
                    type="text"
                    defaultValue={modifyVehicle.Color}
                    onChange={handleChange}
                    invalid={errors.Color.length > 0}
                />
                <FormFeedback>{errors.Color}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="marca">Marca</Label>
                <Input
                    id="marca"
                    name="Marca"
                    placeholder="Ingresa la ubicacion corregida del lugar"
                    type="text"
                    defaultValue={modifyVehicle.Marca}
                    onChange={handleChange}
                    invalid={errors.Marca.length > 0}
                />
                <FormFeedback>{errors.Color}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="description">Descripcion</Label>
                <Input
                    id="description"
                    name="Descripcion"
                    type="textarea"
                    defaultValue={modifyVehicle.Descripcion}
                    onChange={handleChange}
                    invalid={errors.Descripcion.length > 0}
                />
                <FormFeedback>{errors.Descripcion}</FormFeedback>
            </FormGroup>
            <div className="d-grid gap-2">
                <Button>Actualizar</Button>
            </div>
        </Form>
    );
}

export default FormVeh;
