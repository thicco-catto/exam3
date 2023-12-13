"use client";

import Link from "next/link";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

const registerLogin = async (userData: any) => {
  try {
    // Realiza la llamada a tu API o función del backend para almacenar la información en la base de datos
    await fetch('/api/registrations', {
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
        caducidad: session.expires,
        email: session.user.email,
        // Otros datos relevantes para el inicio de sesión
      };
      registerLogin(userData);
    }
  }, [session]);

  return (
    <nav className="bg-gray-500 flex items-center py-3 px-4 justify-between text-white">
      <Link href="/">
        <h1 className="mr-auto cursor-pointer">appName</h1>
      </Link>

      {session?.user ? (
        <div className="flex gap-x-2 items-center">
          <Link href="/inicio">Inicio</Link>
          <Link href="/logRegistrations">Registrations</Link>
          <p className="mr-2">
            {session.user.name} {session.user.email}
          </p>
          <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-sky-400 px-3 py-2 rounded"
        >
          Sign In
        </button>
      )}
    </nav>
  );
}
export default Navbar;
