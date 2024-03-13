"use client";
import React from 'react'
import './styles.css'
import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [error, setError] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    const res = await signIn('credentials', {
      Correo: data.Correo,
      Contrasena: data.Contrasena,
      redirect: false
    });
    if (res.error) {
      setError(res.error)
    } else {
      router.push('/dashboard')
    }
  })

  return (
    <section className="vh-100 gradient-custom">
      <form onSubmit={onSubmit}>

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                <div className="card-body p-5 text-center">

                  <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Iniciar Sesion</h2>
                    <p className="text-white-50 mb-5">Por favor ingrese su correo electronico y contraseña!</p>
                    {
                      errors.Correo && (
                        <span className="text-warning">
                          {errors.Correo.message}
                        </span>
                      )
                    }
                    <div className="form-outline form-white mb-4">
                      <input type="email" {...register("Correo", { required: { value: true, message: 'Ingresar un correo electronico es obligatorio' }, })} className="form-control form-control-lg" placeholder='alguien@email.com' />
                      <label className="form-label">Email</label>
                    </div>

                    {
                      errors.Contrasena && (
                        <span className="text-warning">
                          {errors.Contrasena.message}
                        </span>
                      )
                    }
                    <div className="form-outline form-white mb-4">
                      <input type="password"{...register("Contrasena", { required: { value: true, message: 'Ingresar una contraseña es obligatoria' }, })} className="form-control form-control-lg" placeholder='*********' />
                      <label className="form-label">Contraseña</label>
                    </div>


                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Olvido su contraseña?</a></p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Ingresar</button>
                    {error && (
                      <div className="alert alert-danger mt-2" role="alert" style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                        {error}
                      </div>

                    )}

                  </div>

                  <div>
                    {/* <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                  </p> */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
