import { GetEvents } from "@/lib/database";
import { GetIdFilter, Params } from "@/lib/route-helper";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    id: string
}

export async function GET(_: NextRequest, {params}: Params<RouteParams>){
    const id = params.id;

    if(!ObjectId.isValid(id)) {
        return NextResponse.json({}, {status: 406});
    }

    const direcciones = await GetEvents();

    const res = await direcciones.findOne(GetIdFilter(id));

    if(!res) {
        return NextResponse.json({}, {status: 404});
    }

    return NextResponse.json(res, {status: 200});
}