'use client';

import React, { useState, useEffect } from "react";
import EnvironmentTable from "@/components/mentor/environmentTable.jsx";
import CreateEnvironmentDialog from "@/components/mentor/createEnvironmentDialog";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const My3D = () => {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();

  const [environments, setEnvironments] = useState([]);
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Redirect if not authenticated or userType is not "mentor"
    if (!isAuthenticated || userType !== "mentor") {
      router.replace("/");
      return;
    }

    const fetchEnvironments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/environments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setEnvironments(data.data || []);
        } else {
          setMessage(data.message || "Failed to fetch environments.");
        }
      } catch (error) {
        console.error("[FETCH_ENVIRONMENTS_ERROR]", error);
        setMessage("An error occurred while fetching environments.");
      } finally {
        setLoading(false);
      }
    };

    const fetchObjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/3d-objects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setObjects(data.data || []);
        } else {
          setMessage(data.message || "Failed to fetch objects.");
        }
      } catch (error) {
        console.error("[FETCH_OBJECTS_ERROR]", error);
        setMessage("An error occurred while fetching objects.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
    fetchObjects();
  }, [isAuthenticated, userType, token, router]);

  const handleCreateEnvironment = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/environments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify({
          title: formData.title,
          object_ids: formData.objects.map((obj) => obj.id),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEnvironments((prev) => [
          ...prev,
          {
            id: data.data.id,
            title: data.data.title,
            objects: formData.objects,
            created_at: new Date().toISOString(),
          },
        ]);
        setMessage("Environment created successfully!");
      } else {
        setMessage(data.message || "Failed to create environment.");
      }
    } catch (error) {
      console.error("[CREATE_ENVIRONMENT_ERROR]", error);
      setMessage("An error occurred while creating the environment.");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || userType !== "mentor") {
    return null; // Prevent rendering if redirecting
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">My 3D Environments</h1>
      {loading && <p>Loading...</p>}
      {message && <p className="text-red-500">{message}</p>}

      <div className="flex justify-end">
        <CreateEnvironmentDialog objects={objects} onCreate={handleCreateEnvironment} />
      </div>
      <EnvironmentTable environments={environments} />
    </div>
  );
};

export default My3D;
