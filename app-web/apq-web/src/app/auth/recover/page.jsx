"use client";
import './styles.css';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';;


function RecoverPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [error, setError] = useState(null);
    const [showNewForm, setShowNewForm] = useState(false);
    const [newFormData, setNewFormData] = useState({ code: '', password1: '', password2: '' });
    const [dataToSent, setDataToSend] = useState({ idUsuario: '', Contrasena: '', Codigo: '' });
    const [formErrors, setFormErrors] = useState({ code: '', password1: '', password2: '' });

    const onSubmit = handleSubmit(async (data) => {
        try {
            const newData = await axios.post(`/api/reset`, data);
            dataToSent.idUsuario = newData.data.idUsuario;
            dataToSent.Codigo = newData.data.Codigo;
            const emailResponse = await fetch('/api/send/resetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario: newData.data.Correo, codigo: newData.data.Codigo }),
            });

            if (!emailResponse.ok) {
                throw new Error('El correo electrónico no fue encontrado');
            }

            setShowNewForm(true); // Mostrar el nuevo formulario
        } catch (error) {
            setError(error.message);
        }
    });

    const onNewFormSubmit = async (e) => {
        e.preventDefault();

        // Validar los campos de entrada
        let errors = {};
        if (!newFormData.code) errors.code = 'El código es obligatorio.';
        if (!newFormData.password1) errors.password1 = 'La contraseña es obligatoria.';
        if (!newFormData.password2) errors.password2 = 'La confirmación de la contraseña es obligatoria.';
        if (newFormData.password1 !== newFormData.password2) errors.password2 = 'Las contraseñas no coinciden.';
        if (newFormData.password1.length < 6 || newFormData.password2.length < 6) {
            errors.password1 = 'La contraseña debe tener al menos 6 caracteres.';
            errors.password2 = 'La confirmación de la contraseña debe tener al menos 6 caracteres.';
        }
        setFormErrors(errors);

        if (!errors.code && !errors.password1 && !errors.password2) {
            try {
                //console.log(newFormData);
                dataToSent.Contrasena = newFormData.password1;
                const newPassword = await axios.post(`/api/reset/new`, dataToSent);
                router.push('/auth/login')
                // Aquí puedes manejar la respuesta de la petición
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleInputChange = (e) => {
        setNewFormData({ ...newFormData, [e.target.name]: e.target.value });
    };

    return (
        <section className="vh-100 gradient-custom">
            {!showNewForm ? (
                <form onSubmit={onSubmit}>

                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Recuperar Contraseña</h2>
                                            <p className="text-white-50 mb-5">Problemas al iniciar sesion? Ingresa tu correo electronico para recuperar tu cuenta</p>
                                            {
                                                errors.Correo && (
                                                    <span className="text-warning">
                                                        {errors.Correo.message}
                                                    </span>
                                                )
                                            }

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="email"
                                                    {...register("Correo", {
                                                        required: { value: true, message: 'Ingresar un correo electronico es obligatorio' },
                                                    })}
                                                    className="form-control form-control-lg"
                                                    placeholder='alguien@email.com'
                                                    maxLength={50}
                                                />
                                                <label className="form-label">Email</label>
                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Recuperar correo electronico</button>
                                            {error && (
                                                <div className="alert alert-danger mt-2" role="alert" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                                                    {error}
                                                </div>
                                            )}
                                        </div>
                                        <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Volver a Inicio de Sesion</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">Recuperar Contraseña</h2>
                                        <p className="text-white-50 mb-5">Se te ha enviado un correo electronico para completar este formulario</p>
                                        <form onSubmit={onNewFormSubmit}>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    name="code"
                                                    value={newFormData.code}
                                                    onChange={handleInputChange}
                                                    maxLength={6}
                                                    className="form-control form-control-lg"
                                                    placeholder='Código'
                                                />
                                                <label className="form-label">Código</label>
                                                {formErrors.code && <span className="text-warning">{formErrors.code}</span>}
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    name="password1"
                                                    value={newFormData.password1}
                                                    onChange={handleInputChange}
                                                    maxLength={30}
                                                    className="form-control form-control-lg"
                                                    placeholder='Contraseña'
                                                />
                                                <label className="form-label">Contraseña</label>
                                                {formErrors.password1 && <span className="text-warning">{formErrors.password1}</span>}
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    name="password2"
                                                    value={newFormData.password2}
                                                    onChange={handleInputChange}
                                                    maxLength={30}
                                                    className="form-control form-control-lg"
                                                    placeholder='Confirmar Contraseña'
                                                />
                                                <label className="form-label">Confirmar Contraseña</label>
                                                {formErrors.password2 && <span className="text-warning">{formErrors.password2}</span>}
                                            </div>
                                            {error && <span className="text-warning">{error}</span>}
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Enviar</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default RecoverPage
