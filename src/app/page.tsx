import { EventList } from '@/components/EventsList';
import LazyMap, { LazyMarker } from '@/components/Map.lazy';
import { SearchEventForm } from '@/components/SearchEventForm';
import React from 'react';

async function HomePage({
    params,
    searchParams,
}: {
    params: never;
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const filters = [];
    let parsedLon
    let parsedLat

    if(searchParams) {
        const lon = searchParams["lon"]
        if(lon) {
            if(lon && typeof(lon) === "string" && lon.length > 0) {
                if(!isNaN(parseFloat(lon))) {
                    parsedLon = parseFloat(lon);
                }
                filters.push(`lon=${lon}`);
            }
        }

        const lat = searchParams["lat"]
        if(lat) {
            if(lat && typeof(lat) === "string" && lat.length > 0) {
                if(!isNaN(parseFloat(lat))) {
                    parsedLat = parseFloat(lat);
                }
                filters.push(`lon=${lat}`);
            }
        }
    }

    const filterStr = filters.length > 0? `?${filters.join("&")}` : "";
    const response = await fetch(`${process.env.NEXTAUTH_URL}api/events${filterStr}`);
    let events = [];
    if(response.ok) {
        events = await response.json();
    }

    return <>
        <SearchEventForm></SearchEventForm>
        {parsedLat !== undefined && parsedLon !== undefined ?
            (
                <div style={{height: "300px"}}>
                    <LazyMap center={[parsedLat, parsedLon]} zoom={15}>
                        {events.map((event: any) =>
                            <LazyMarker key={event._id} position={[event.lat, event.lon]}></LazyMarker>
                        )}
                    </LazyMap>
                </div>
            ):
            (
                <>
                </>
            )
        }
        <EventList events={events}></EventList>
    </>;
}

export default HomePage;
