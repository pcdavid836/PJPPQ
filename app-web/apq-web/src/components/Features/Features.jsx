'use client';

import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: '¿Cómo funciona?',
    description: 'Explora espacios de parqueo disponibles en tu área, reserva con anticipación y paga de forma segura. Nuestro sistema te conecta directamente con anfitriones verificados.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '¿Tiene algún costo?',
    description: 'La aplicación es completamente gratuita para usuarios básicos. Los anfitriones pagan una pequeña comisión por transacción completada. Anuncios opcionales ayudan a mantener el servicio.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title: '¿Cómo me postulo?',
    description: 'Descarga la app, crea tu cuenta y registra tu espacio en minutos. Nuestro equipo verifica cada perfil para garantizar seguridad y confianza en toda la comunidad.',
    color: 'from-purple-500 to-pink-500'
  }
];

export function Features() {
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
            Características Principales
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Todo lo que necesitas saber
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Descubre cómo APQ está revolucionando la forma de encontrar y ofrecer espacios de parqueo
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
              >
                Saber más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>

              {/* Decorative Corner */}
              <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-10 text-white">
            <h3 className="text-2xl font-bold mb-4">¿Te interesa unirte?</h3>
            <p className="text-gray-300 mb-6">
              Estamos buscando personas talentosas para coordinar y mejorar este proyecto. 
              Si tienes pasión por la tecnología y el desarrollo, envíanos un correo.
            </p>
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors">
              Enviar Correo
            </button>
          </div>

          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">¿Quiénes somos?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              El proyecto APQ nació en 2023 cuando dos ideas brillantes se conectaron. 
              Desde entonces, hemos crecido y evolucionado para servir mejor a nuestra comunidad.
            </p>
            <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-full hover:opacity-90 transition-opacity">
              Conocer Más
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
