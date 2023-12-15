import { NextRequest, NextResponse } from "next/server";
import { GetEvents } from "@/lib/database";

export async function GET(request: NextRequest) {
    const coleccion = await GetEvents();
    const params = request.nextUrl.searchParams;

    const res = await coleccion.find().sort({date: -1}).toArray();

    const lat = params.get("lat")
    const lon = params.get("lon")
    if(lat && lon) {
        const parsedLat = parseFloat(lat);
        const parsedLon = parseFloat(lon);

        if(!isNaN(parsedLat) && !isNaN(parsedLon)) {
            const closeEvents = res.filter(event => {
                return Math.sqrt(Math.pow(event.lat - parsedLat, 2) + Math.pow(event.lon - parsedLon, 2)) < 0.2
            });

            return NextResponse.json(
                closeEvents,
                {
                    status: 200
                }
            );
        }
    }

    return NextResponse.json(
        res,
        {
            status: 200
        }
    );
}


export async function POST(request: NextRequest) {
    let body;
    
    try {
        body = await request.json()
    } catch(_) {
        return NextResponse.json(
            {
                msg: "Couldn't parse json body."
            },
            {
                status: 400
            }
        );
    }

    body["date"] = new Date(body["date"]);

    const collection = await GetEvents();
    const result = await collection.insertOne(body);
    const status = result.acknowledged? 201: 500;
    const id = result.insertedId;

    return NextResponse.json(
        {
            id: id
        },
        {
            status: status
        }
    );
}