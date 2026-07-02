'use client';

import React from 'react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://content.r9cdn.net/rimg/dimg/cc/78/4dd70310-city-18972-169edc202ea.jpg?width=1366&height=768&xhint=2841&yhint=2969&crop=true")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-white/90 text-sm font-medium">Disponibles en Android e iOS</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Encuentra tu lugar de
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Parqueo Ideal
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Conecta con espacios de parqueo seguros y confiables en tu comunidad. 
            La forma inteligente de estacionar.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="#search"
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar Parqueo
            </a>
            <a
              href="#become-host"
              className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ser Anfitrión
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 mt-8 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/60 text-sm mt-1">Parqueos Activos</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">2K+</div>
              <div className="text-white/60 text-sm mt-1">Usuarios Felices</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">98%</div>
              <div className="text-white/60 text-sm mt-1">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

export default Hero;
