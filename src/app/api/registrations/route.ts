import { GetRegistrations } from "@/lib/database";
import { HasAllKeys } from "@/lib/dict_helper";
import { Filter, Document, SortDirection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const KEYS: string[] = [
    "caducidad",
    "email"
];

export async function GET(request: NextRequest) {
    const registrations = await GetRegistrations();
    const params = request.nextUrl.searchParams;

    const filter: Filter<Document> = {$and: []};

    //En el caso de que el and este vacio, hay que borrar el and porque sino no funciona
    if(filter.$and?.length === 0) {
        delete filter.$and;
    }

    const sort: { [key: string]: SortDirection } = { caducidad: -1 };

  const res = await registrations.find(filter).sort(sort).toArray();

    return NextResponse.json(
        res,
        {
            status: 200
        }
    );
}

export async function POST(request: NextRequest) {
    const registrations = await GetRegistrations();
    const json = await request.json();

    if(!HasAllKeys(json, KEYS)) {
        return NextResponse.json(
            {msg: "Faltan atributos"},
            {
                status: 406
            }
        );
    }

    const result = await registrations.insertOne(json);
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