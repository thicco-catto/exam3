import { Filter, ObjectId, Document } from "mongodb";

export interface Params<T> {
    params: T
}

/**
 * Returns a filter object used in mongodb queries that only contains a filter for the id.
 * @param id 
 */

export function GetIdFilter(id: string): Filter<Document> {
    return {_id: {$eq: ObjectId.createFromHexString(id)}};
}

/*

export function GetTelefonoFilter(tlf: number): Filter<Document> {
    return {telefono: {$eq: tlf}};
}

export function GetUsuarioFilter(tlf: number): Filter<Document> {
    return {usuario: {$eq: tlf}};
}

export function GetAliasFilter(alias: string): Filter<Document> {
    return {alias: {$eq: alias}};
}

export function GetEmisorMensaje(tlf: number): Filter<Document> {
    return {origen: {$eq: tlf}};
}

export function GetReceptorMensaje(tlf: number): Filter<Document> {
    return {destino: {$eq: tlf}};
}

export function GetAliasPartialFilter(aliasPart: string): Filter<Document> {
    return {
        alias: { $regex: aliasPart, $options: "i" } // "i" para hacer la búsqueda insensible a mayúsculas y minúsculas
    };
}

export function GetMensajesWithPartialText(textPart: string): Filter<Document> {
    return {
        texto: { $regex: textPart, $options: "i" } // "i" para hacer la búsqueda insensible a mayúsculas y minúsculas
    };
}
*/