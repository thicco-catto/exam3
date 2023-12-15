import LazyMap, { LazyMarker } from "@/components/Map.lazy";
import { Params } from "@/lib/route-helper";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface RouteParams {
    id: string
}

export default async function Event(context: Params<RouteParams>) {
    const id = context.params.id;
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/events/${id}`);
    if(!response.ok) {
        notFound();
    }
    const event = await response.json();

    return <>
        <h1>{event.name}</h1>

        <br></br>

        <Image alt="" src={event.image} width={300} height={300}></Image>

        <br></br>

        <div style={{height: "300px"}}>
            <LazyMap center={[event.lat, event.lon]} zoom={15}>
                <LazyMarker position={[event.lat, event.lon]}></LazyMarker>
            </LazyMap>
        </div>
    </>;
}