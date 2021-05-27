import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { useAuth } from 'src/auth/useAuth'

interface LayoutProps {
  main: ReactNode
}

export const Layout: FC<LayoutProps> = ({ main }) => {
  const { authenticated, logout } = useAuth()

  return (
    <div className="bg-gray-900 h-screen max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800 h-16 font-syne">
        <div className="px-6 flex items-center justify-around h-16">
          <ul className="flex gap-8">
            <li>
              <Link href="/">Pagina de inicio</Link>
            </li>
            {authenticated && (
              <li>
                <Link href="/places/add">Agrega tu negocio</Link>
              </li>
            )}
          </ul>
          {authenticated ? (
            <button onClick={logout}>Cerrar sesion</button>
          ) : (
            <Link href="/auth">Entrar / Crear cuenta</Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>{main}</main>
    </div>
  )
}
