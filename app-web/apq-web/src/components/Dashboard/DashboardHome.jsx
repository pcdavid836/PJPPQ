'use client';

import React, { useState } from 'react';

const kpiData = [
  { label: 'Usuarios Activos', value: '2,847', change: '+12.5%', positive: true },
  { label: 'Parqueos Registrados', value: '532', change: '+8.2%', positive: true },
  { label: 'Transacciones Hoy', value: '156', change: '-3.1%', positive: false },
  { label: 'Ingresos del Mes', value: '$12,450', change: '+24.3%', positive: true },
];

const recentActivity = [
  { id: 1, user: 'María González', action: 'Nuevo parqueo registrado', time: 'Hace 5 min', type: 'park' },
  { id: 2, user: 'Carlos Ruiz', action: 'Reporte enviado', time: 'Hace 12 min', type: 'report' },
  { id: 3, user: 'Ana Martínez', action: 'Solicitud completada', time: 'Hace 25 min', type: 'request' },
  { id: 4, user: 'Luis Pérez', action: 'Usuario verificado', time: 'Hace 1 hora', type: 'user' },
];

export function DashboardHome() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-3">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=3b82f6&color=fff"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Administrador</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@apq.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-800 min-h-[calc(100vh-73px)] sticky top-[73px] transition-all duration-300`}>
          <nav className="p-4 space-y-2">
            {[
              { icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'Dashboard', active: true },
              { icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', label: 'Parqueos', active: false },
              { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', label: 'Solicitudes', active: false },
              { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Usuarios', active: false },
              { icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z', label: 'Vehículos', active: false },
              { icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', label: 'Reportes', active: false },
            ].map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  item.active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              ¡Bienvenido al Dashboard! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Aquí tienes un resumen de la actividad de tu plataforma
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{kpi.label}</p>
                <div className="flex items-end justify-between">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    kpi.positive 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Actividad Reciente</h2>
              <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:underline">
                Ver todo
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'park' ? 'bg-blue-100 text-blue-600' :
                    activity.type === 'report' ? 'bg-orange-100 text-orange-600' :
                    activity.type === 'request' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{activity.user}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.action}</p>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardHome;
