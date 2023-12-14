"use client";

import React, { useState, ChangeEvent } from "react";
import { Map } from "@/components/Map";

function Inicio() {
  // IMAGES
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setUploadMessage("Please choose a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(`Image uploaded successfully. Public ID: ${data.public_id}`);
      } else {
        const errorData = await response.json();
        setUploadMessage(`Error uploading image: ${errorData.msg}`);
      }
    } catch (error) {
      setUploadMessage(`Error uploading image.`);
    }
  };

  // MAP
  const direction = await fetch("api/diretions/65787cd49324c963057952d2");

  if(direction === null){
		notFound();
	}

  const map = await Get(`${PATH}/${addressID}`);

  if(mapa === null){
		notFound();
	}

  const longitud = Number(mapa.lon);
	const latitud = Number(mapa.lat);

  return (
    <div>
      <h1>InicioPage</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}

      <p>Aqui tienes la dirección:</p>

		<div style={{width:"100%", height:"500px", backgroundColor:"red"}}>
			<Map longitud={longitud} latitud={latitud}></Map>
		</div>

    </div>
  );
}

export default Inicio;
function notFound() {
  throw new Error("Function not implemented.");
}

function Get(arg0: string) {
  throw new Error("Function not implemented.");
}

