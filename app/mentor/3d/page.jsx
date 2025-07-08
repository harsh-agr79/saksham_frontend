'use client';

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter,CardDescription, } from "@/components/ui/card";



export default function UploadPage() {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if user is not authenticated or authorized
  if (!isAuthenticated || userType !== "mentor") {
    router.replace("/");
    return null;
  }

  // Handle file selection
  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map((file) => ({
      file,
      name: "",
    }));
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  // Handle file name change
  const handleFileNameChange = (index, newName) => {
    setFiles((prevFiles) =>
      prevFiles.map((file, i) => (i === index ? { ...file, name: newName } : file))
    );
  };

  // Handle file removal
  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Handle file upload
  const handleUploadFile = async (index) => {
    const fileData = files[index];
    const formData = new FormData();
    formData.append("file[]", fileData.file);
    formData.append("name[]", fileData.name);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/3d-objects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Bearer token from Redux
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // API key from env variables
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`File "${fileData.name}" uploaded successfully!`);
        handleRemoveFile(index); // Remove file from UI after successful upload
      } else {
        setMessage(data.message || "Failed to upload file.");
      }
    } catch (error) {
      console.error("[UPLOAD_FILE_ERROR]", error);
      setMessage("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div><Card className="w-full  mx-auto shadow-lg p-6 border border-gray-300 rounded-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-gray-800">
          Instructions for Creating and Uploading 3D Models
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-lg text-gray-600 space-y-4">
          <ol className="list-decimal list-inside">
            <li>Take a high-definition 2D image that clearly shows all parts of the object.</li>
            <li>Upload the picture into the model creation tool.</li>
            <li>The tool will automatically remove the background from the image.</li>
            <li>It will then generate a 3D object in <code>.glb</code> format.</li>
            <li>Once the 3D object is generated, download the <code>.glb</code> file.</li>
            <li>Upload the downloaded <code>.glb</code> file to the environment.</li>
            <li>Provide a proper name for the uploaded object and save it.</li>
          </ol>
        </CardDescription>
      </CardContent>
    </Card></div>
      <h1 className="text-3xl font-bold text-center">3D Model Generator</h1>
      <p className="text-center text-gray-600">
        Use the embedded tool below to generate 3D models from your images.
      </p>

      {/* Responsive iFrame */}
      <div className="flex justify-center">
        <iframe
          src="https://stabilityai-stable-fast-3d.hf.space"
          frameBorder="0"
          className="rounded-md shadow-lg"
          title="3D Model Generator"
          style={{
            width: "100%",
            maxWidth: "1200px", // Maximum width for large devices
            height: "80vh", // Height as a percentage of the viewport
          }}
        ></iframe>
      </div>

      <p className="text-center text-gray-600">
        Use the embedded tool below to generate 3D models from text.
      </p>
      <div className="container mx-auto py-10 px-4">
      <div className="flex justify-center items-center">
        <iframe
          src="https://tencent-hunyuan3d-1.hf.space"
          frameBorder="0"
          style={{
            width: "100%",
            maxWidth: "1200px", // Maximum width for large devices
            height: "80vh", // Height as a percentage of the viewport
          }}
          className="border border-gray-300 shadow-lg rounded-lg"
          title="Text to 3D Model Converter"
        ></iframe>
      </div>
    </div>



      {/* Upload Card */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle className="text-xl">Upload Files</CardTitle>
        </CardHeader>
        <CardContent>
          <label
            htmlFor="fileUpload"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Files
          </label>
          <Input
            type="file"
            id="fileUpload"
            multiple
            onChange={handleFileUpload}
            className="mb-4"
          />

          {files.length > 0 && (
            <div className="space-y-4">
              {files.map((fileData, index) => (
                <Card key={index} className="p-4 border shadow-sm">
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-sm font-semibold">
                      {fileData.file.name}
                    </CardTitle>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </Button>
                  </CardHeader>
                  <CardContent className="mt-4">
                    <label
                      htmlFor={`file-name-${index}`}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Set Name
                    </label>
                    <Input
                      id={`file-name-${index}`}
                      value={fileData.name}
                      onChange={(e) => handleFileNameChange(index, e.target.value)}
                      placeholder="Enter a name for this file"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleUploadFile(index)}
                      disabled={!fileData.name.trim()}
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {message && (
        <p className="text-center text-green-600 font-medium mt-4">{message}</p>
      )}
    </div>
  );
}
