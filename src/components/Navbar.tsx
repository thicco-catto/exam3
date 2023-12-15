"use client";

import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const registerLogin = async (userData: any) => {
  try {
    await fetch('/api/userLogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  } catch (error) {
    console.error('Error registrando el inicio de sesión:', error);
  }
};

function Navbar() {
  const { data: session } = useSession();

  // Utiliza useEffect para realizar la llamada a la base de datos cuando el usuario ha iniciado sesión
  useEffect(() => {
    if (session?.user) {
      const userData = {
        expires: session.expires,
        email: session.user.email,
        date: Date()
      };
      registerLogin(userData);
    }
  }, [session]);

  return (
    <nav className="bg-gray-500 flex items-center py-3 px-4 justify-between text-white">
      <Link href="/">
        <h1 className="mr-auto cursor-pointer">Eventual</h1>
      </Link>

      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/newEvent">Evento Nuevo</Link>
          <Link href="/userLogs">Logs</Link>
          <p className="mr-2">
            {session.user.name}
          </p>
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              });
            }}
            className="bg-sky-400 px-3 py-2 rounded"
          >
            Salir
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded"
        >
          Iniciar Sesión
        </button>
      )}
    </nav>
  );
}
export default Navbar;
