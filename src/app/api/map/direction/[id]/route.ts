import { GetDirections } from "@/lib/database";
import { GetIdFilter, Params } from "@/lib/route-helper";
import { WithId, Document, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

interface RouteParams {
    id: string
}

/**
 * Returns the Open Street Maps address from the nominatim API. Since this returns a list of
 * possible matching address, this function will always return the first one, assuming it's the
 * closest one.
 * @param direccion 
 * @returns 
 */
async function GetOSMAddress(direccion: WithId<Document>) {
    const city = `city=${direccion["Localidad"]}`;

    const format = "format=json";
    const queryParams = [city, format].join("&");
    const response = await fetch("https://nominatim.openstreetmap.org/search?" + queryParams);
    return (await response.json())[0];
}

export async function GET(_: unknown, {params}: Params<RouteParams>) {
    const id = params.id;

    if(!ObjectId.isValid(id)) {
        return NextResponse.json(
            {
                msg: "The object ids are not correct."
            },
            {
                status: 406
            }
        );
    }

    const direcciones = await GetDirections();
    const address = await direcciones.findOne(GetIdFilter(id));

    if(!address) {
        return NextResponse.json(
            {
                
            },
            {
                status: 404
            }
        );
    }

    const osmAddress = await GetOSMAddress(address);

    return NextResponse.json(
        osmAddress,
        {
            status: 200
        }
    );
}