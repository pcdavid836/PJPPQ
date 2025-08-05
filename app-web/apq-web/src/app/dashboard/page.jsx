function DashboardPage() {
    return (
        <div>
            <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
                        <h1 className="h2">Menú Principal</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">

                        </div>
                    </div>
                    <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                        <a href="/" className="d-flex align-items-center text-body-emphasis text-decoration-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="me-2" viewBox="0 0 118 94" role="img"><title>Bootstrap</title><path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z" fill="currentColor"></path></svg>
                            <span className="fs-4">Changelog</span>
                        </a>
                        <div className="container-fluid py-5">
                            <h1 className="display-5 fw-bold">Version 0.0.9</h1>
                            <p className="col-md-8 fs-4">📢 Bienvenido a la release 0.0.91 del Proyecto APQ En esta actualización, se han realizado ajustes menores enfocados principalmente en la optimización de la aplicación móvil. Destaca la incorporación de mejoras relacionadas con el manejo de transacciones vía código QR, fortaleciendo así la funcionalidad financiera del sistema</p>
                            <button className="btn btn-primary btn-lg" type="button">Que hay de nuevo?</button>
                        </div>
                    </div>

                    <div className="row align-items-md-stretch">
                        <div className="col-md-6">
                            <div className="h-100 p-5 text-bg-dark rounded-3">
                                <h2>🧪 Registro de Búsqueda y Recopilación de Bugs</h2>
                                <p>Este módulo documenta de forma detallada la identificación, seguimiento y recolección de errores (bugs) detectados durante el desarrollo y pruebas de la aplicación. La información registrada incluye:
                                    Este registro forma parte del entorno del desarrollador backend y sirve como referencia para futuras versiones, mejoras funcionales y control de calidad general del sistema.
                                </p>
                                <button className="btn btn-outline-light" type="button">Ver Registro</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                                <h2>💡 Sugerencias de Mejora</h2>
                                <p>Los moderadores y administradores que deseen proponer cambios relacionados con el uso del programa pueden enviar sus sugerencias al equipo de desarrollo por correo electrónico. Todas las recomendaciones serán consideradas para mejorar la experiencia y optimizar las funciones disponibles en el sistema.</p>
                                <button className="btn btn-outline-secondary" type="button">Escribir Correo</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}
export default DashboardPage
