import {FC, ReactNode} from 'react';
import Link from 'next/link';

interface LayoutProps {
  main: ReactNode;
}

export const Layout: FC<LayoutProps> = ({main}) => {
  const authenticated = false;

  const logout = () => console.log('logging out');

  return (
    <div className="bg-gray-900 h-screen max-w-screen-2xl mx-auto text-white">
      <nav className="bg-gray-800 h-16">
        <div className="px-6 flex items-center justify-around h-16">
          <ul className="flex gap-8">
            <li>
              <Link href="/">Pagina de inicio</Link>
            </li>
            {authenticated && (
              <li>
                <Link href="/bussiness/add">Add bussiness</Link>
              </li>
            )}
          </ul>
          {authenticated ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link href="/auth">Entrar / Crear cuenta</Link>
          )}
        </div>
      </nav>
      <main style={{minHeight: 'calc(100vh - 64px)'}}>{main}</main>
    </div>
  );
};
