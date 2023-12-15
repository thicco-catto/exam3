import { Params } from "@/lib/route-helper";
import { NextResponse } from "next/server";

interface RouteParams {
    code: string
}

export async function GET(_: unknown, {params}: Params<RouteParams>) {
    const postalCode = params.code;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?country=spain&postalcode=${postalCode}&format=json`);
    const osmAddress = (await response.json())[0];

    return NextResponse.json(
        osmAddress,
        {
            status: 200
        }
    );
}