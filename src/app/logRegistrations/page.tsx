"use client";

import { useEffect, useState } from 'react';

interface Registration {
  _id: string;
  email: string;
  caducidad: string;
}

function Registrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/registrations');
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-screen-xl px-4">
      <h2 className="text-2xl font-bold mb-4">Registrations</h2>
      <div className="grid gap-4">
        {registrations.map((registration) => (
          <div key={registration._id} className="p-4 border rounded-md">
            <p>Email: {registration.email}</p>
            <p>Caducidad: {registration.caducidad}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Registrations;
