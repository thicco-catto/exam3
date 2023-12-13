import { NextRequest, NextResponse } from "next/server";
import { Filter, Document } from "mongodb";
import { GetDirections } from "@/lib/database";

export async function GET(request: NextRequest) {
    const coleccion = await GetDirections();
    const params = request.nextUrl.searchParams;

    const filter: Filter<Document> = {$and: []};

    //En el caso de que el and este vacio, hay que borrar el and porque sino no funciona
    if (filter.$and?.length === 0) {
        delete filter.$and;
    }
    const res = await coleccion.find(filter).toArray();

    return NextResponse.json(
        res,
        {
            status: 200
        }
    );
}