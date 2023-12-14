import React from "react";
import { Map } from "@/components/Map";
import { notFound } from "next/navigation";
import { ImageForm } from "@/components/ImageForm";

export default async function Inicio() {
    const directionResponse = await fetch(`http://localhost:3000/api/directions/65787cd49324c963057952d2`);
    if (directionResponse.status !== 200) {
        notFound();
    }
    const direction = await directionResponse.json();

    const mapResponse = await fetch(`http://localhost:3000/api/map/direction/${direction._id}`);
    if (mapResponse.status !== 200) {
        notFound();
    }
    const map = await mapResponse.json();

    const longitud = Number(map.lon);
    const latitud = Number(map.lat);

    return (
        <div>
            <h1>InicioPage</h1>
            <ImageForm></ImageForm>

            <p>Aqui tienes la dirección:</p>

            <div style={{ width: "100%", height: "500px", backgroundColor: "red" }}>
                <Map longitud={longitud} latitud={latitud}></Map>
            </div>

        </div>
    );
}
