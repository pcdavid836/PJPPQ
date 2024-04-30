"use client";
import './styles.css'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from 'axios';;

function BaptismPage() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const router = useRouter();
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const [dataToSent, setDataToSend] = useState({ Correo: '', Contrasena: '' });
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Recupera 'data' del almacenamiento local
        const data = localStorage.getItem('userData');
        if (data) {
            setUserData(JSON.parse(data));
        }
    }, []);
    console.log(userData);
    const onSubmit = handleSubmit(async (data) => {
        try {
            dataToSent.Correo = userData.Correo;
            dataToSent.Contrasena = data.password1;
            const newPassword = await axios.post(`/api/owninfo/welcome`, dataToSent);
            setSuccess("Cambio de contraseña completado!");
            router.push('/dashboard')
        } catch (error) {
            setError(error.message);
        }
    })

    return (
        <section className="vh-100 gradient-custom">
            {userData && userData.Estado === 1 ? (
                <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>Volver</button>
            ) : (
                <form onSubmit={onSubmit}>


                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-5 text-center">

                                        <div className="mb-md-5 mt-md-4 pb-5">

                                            <h2 className="fw-bold mb-2 text-uppercase">Registrar nueva contraseña</h2>
                                            <p className="text-white-50 mb-5">Bienvenido! Ingrese una nueva contraseña para terminar su registro dentro el sistema.</p>

                                            <div className="form-outline form-white mb-4">
                                                <label className="form-label">Contraseña</label>
                                                <input type="password" {...register("password1", { required: "Este espacio no puede estar vacio", maxLength: { value: 30, message: "La contraseña no puede tener más de 30 caracteres" } })} className="form-control form-control-lg" placeholder='Contraseña' />
                                                {errors.password1 && <span className="text-warning">{errors.password1.message}</span>}
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <label className="form-label">Confirmar Contraseña</label>
                                                <input type="password" {...register("password2", { required: "Este espacio no puede estar vacio", maxLength: { value: 30, message: "La contraseña no puede tener más de 30 caracteres" }, validate: value => value === watch('password1') || "Las contraseñas no coinciden" })} className="form-control form-control-lg" placeholder='Confirmar Contraseña' />
                                                {errors.password2 && <span className="text-warning">{errors.password2.message}</span>}
                                            </div>

                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Ingresar</button>
                                            {error && (
                                                <div className="alert alert-danger mt-2" role="alert" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                                                    {error}
                                                </div>
                                            )}
                                            {success && (
                                                
                                                <div className="alert alert-success mt-2" role="alert" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                                                    {success}
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </section>
    )
}

export default BaptismPage
