"use client";
import React from 'react'
import { useSession } from "next-auth/react"

async function MyInfoPage() {

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Tu Información</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
      </main>
    </div>
  )
}

export default MyInfoPage