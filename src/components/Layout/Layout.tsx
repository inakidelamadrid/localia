import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';

interface LayoutProps {
  main: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ main }) => {
  const { authenticated, logout } = useAuth();

  const logInOutClasses = 'nav-link ml-auto';

  return (
    <div className="bg-warm-gray-50 h-screen max-w-screen-2xl mx-auto text-white">
      <nav className="h-16 bg-green-400 font-montserrat">
        <div className="px-6 flex items-center justify-around h-16">
          <ul className="flex gap-8">
            <li>
              <Link href="/">
                <a className="nav-link">Pagina de inicio</a>
              </Link>
            </li>
            {authenticated && (
              <li>
                <Link href="/places/add">
                  <a className="nav-link">Agrega tu negocio</a>
                </Link>
              </li>
            )}
          </ul>
          {authenticated ? (
            <button className={logInOutClasses} onClick={logout}>
              Cerrar sesion
            </button>
          ) : (
            <Link href="/auth">
              <a className={logInOutClasses}>Entrar / Crear cuenta</a>
            </Link>
          )}
        </div>
      </nav>
      <main style={{ minHeight: 'calc(100vh - 64px)' }}>{main}</main>
    </div>
  );
};
