"use client";

import React, { useState, ChangeEvent } from "react";

function Inicio() {
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

  return (
    <div>
      <h1>InicioPage</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload Image</button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default Inicio;
