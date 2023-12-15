"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export function SearchEventForm() {
    const [postalCode, setPostalCode] = useState("");

    const OnPostalCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPostalCode = event.target.value;

        setPostalCode(newPostalCode);
    }

    const HandleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch(`/api/map/fromPostalCode/${postalCode}`);
        const osmAddress = await response.json();

        window.location.href = `?lat=${osmAddress.lat}&lon=${osmAddress.lon}`
    }

    return <>
        <form onSubmit={HandleSubmit}>
            <label htmlFor="postalCode">Código postal: </label>
            <input style={{backgroundColor:"lightgray", marginRight:"2%"}} onChange={OnPostalCodeChange} type="text" name="postalCode"></input>
            <button className="bg-sky-400 px-3 py-2 rounded" type="submit">Filtrar</button>
        </form>
    </>
}