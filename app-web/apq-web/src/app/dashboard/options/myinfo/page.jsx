import { getServerSession } from "next-auth/next";
import NextAuth, { authOptions } from 'next-auth'
import FormOwnInfo from '@/components/EditOwnInfo/FormOwnInfo'

async function MyInfoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirigir al usuario a la página de inicio de sesión si no hay una sesión
    window.location.href = "/auth/signin"
  }

  return (
    <div className="bg-gray-100" style={{ minHeight: '100vh' }}>
      <main className="col-md-10 ms-sm-auto col-lg-10 px-md-5">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3 mb-3 border-bottom bg-dark-subtle">
          <h1 className="h2">Tu Información</h1>
          <div className="btn-toolbar mb-2 mb-md-0">
          </div>
        </div>
        {session && <FormOwnInfo email={session.user.email} />}
      </main>
    </div>
  )
}

export default MyInfoPage
