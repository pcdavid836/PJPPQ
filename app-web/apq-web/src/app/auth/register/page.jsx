"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {

        if (data.Contrasena !== data.confirmarContrasena) {
            return alert("Las contraseñas no coinciden");
        }

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            router.push('/auth/login');
        }
    });

    console.log(errors);
    return (

        <main>
            <div className="container py-4">
                <form action="" onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo electronico:</label>
                        <input type="email"{...register("Correo", { required: { value: true, message: 'Ingresar un correo electronico es obligatorio' }, })} className="form-control" placeholder='ejemplo123@email.com' />
                        {
                            errors.Correo && (
                                <span className="text-red-500">
                                    {errors.Correo.message}
                                </span>
                            )
                        }
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Nombres</label>
                        <input type="text"{...register("Nombres", { required: true, })} className="form-control" placeholder='Juan' />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Primer Apellido</label>
                        <input type="text"{...register("Primer_Apellido", { required: true, })} className="form-control" placeholder='Lopez' />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Segundo Apellido</label>
                        <input type="text"{...register("Segundo_Apellido", { required: true, })} className="form-control" placeholder='Perez' />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">CI</label>
                        <input type="text"{...register("CI", { required: true, })} className="form-control" placeholder='77777777LP' />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Celular</label>
                        <input type="text"{...register("Celular", { required: { value: true, message: 'Ingresar un numero de celular' }, })} className="form-control" placeholder='71727374' />
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password"{...register("Contrasena", { required: { value: true, message: 'Ingresar una contraseña es obligatoria' }, })} className="form-control" placeholder='********' />
                    </div>
                    {
                        errors.Contrasena && (
                            <span className="text-red-500">
                                {errors.Contrasena.message}
                            </span>
                        )
                    }
                    <div className="mt-3 mb-3">
                        <label className="form-label">Repite tu Contraseña</label>
                        <input type="password"{...register("confirmarContrasena", { required: true, })} className="form-control" placeholder='********' />
                    </div>
                    <button type="submit" className="btn btn-primary">Crear nuevo usuario</button>
                </form>
            </div>
        </main>

    )
}
export default RegisterPage;