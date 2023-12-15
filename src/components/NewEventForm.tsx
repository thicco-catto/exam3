"use client";

import { useSession } from "next-auth/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function NewEventForm() {
    const [name, setName] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [date, SetDate] = useState(new Date());
    const [file, setFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    const session = useSession();

    const OnNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newName = event.target.value;

        setName(newName);
    }

    const OnPostalCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newPostalCode = event.target.value;

        setPostalCode(newPostalCode);
    }

    const OnDateChange = (date: Date | null) => {
        if(date) {
            SetDate(date);
        }
    }

    const OnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files && event.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const HandleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!file) {
            setUploadMessage("Please choose a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        let imageUrl;

        try {
            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                imageUrl = data.imageUrl;
            } else {
                const errorData = await response.json();
                setUploadMessage(`Error uploading image: ${errorData.msg}`);
                return;
            }
        } catch (error) {
            setUploadMessage(`Error uploading image.`);
            return;
        }

        const response = await fetch(`/api/map/fromPostalCode/${postalCode}`);
        const osmAddress = await response.json();

        const eventData = {
            name: name,
            date: date,
            postalCode: postalCode,
            lat: osmAddress.lat,
            lon: osmAddress.lon,
            organizer: session.data?.user?.email,
            image: imageUrl
        }

        const postResponse = await fetch(`/api/events`, { method: "POST", body: JSON.stringify(eventData)});

        if(postResponse.ok) {
            const responseBody = await postResponse.json();
            window.location.href = `event/${responseBody.id}`
        }
    }

    return <>
        <form onSubmit={HandleSubmit}>
            <label htmlFor="Name">Nombre del evento:</label>
            <input style={{backgroundColor:"lightgray", marginBottom:"1%"}} name="Name" type="text" onChange={OnNameChange}></input>

            <br></br>

            <label htmlFor="postalCode">Código postal: </label>
            <input style={{backgroundColor:"lightgray", marginBottom:"1%"}} onChange={OnPostalCodeChange} type="text" name="postalCode"></input>

            <br></br>

            <label htmlFor="date">Fecha: </label>
            <DatePicker
                name="date"
                selected={date}
                onChange={OnDateChange}
                showTimeSelect
                timeIntervals={15}
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd h:mm aa"
            />
            
            <br></br>

            <input style={{marginTop:"1%"}} type="file" onChange={OnFileChange} />
            <button className="bg-sky-400 px-3 py-2 rounded" type="submit">Upload Image</button>

            <br></br>

            {uploadMessage && <p>{uploadMessage}</p>}

            <br></br>

            <button className="bg-sky-400 px-3 py-2 rounded" type="submit">Crear Evento</button>
        </form>
    </>
}