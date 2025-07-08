"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";

export const EditModuleDialog = ({ module }) => {
  const { userType, token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [moduleData, setModuleData] = useState({
    id: module.id,
    groupId: module.groupId,
    courseId: module.courseId,
    title: module.title || "",
    videoUrl: module.videoUrl || "",
    description: module.description || "",
    transcript: module.transcript || "",
    materialLinks: module.materialLinks.length ? module.materialLinks : [""],
    position: module.position || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...moduleData.materialLinks];
    updatedMaterials[index] = value;
    setModuleData({ ...moduleData, materialLinks: updatedMaterials });
  };

  const addMaterial = () => {
    setModuleData((prev) => ({
      ...prev,
      materialLinks: [...prev.materialLinks, ""],
    }));
  };

  const removeMaterial = (index) => {
    setModuleData((prev) => ({
      ...prev,
      materialLinks: prev.materialLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/module/${module.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            group_id: moduleData.groupId,
            title: moduleData.title,
            description: moduleData.description,
            video_url: moduleData.videoUrl,
            transcript: moduleData.transcript,
            material_links: moduleData.materialLinks.filter((link) => link.trim() !== ""),
            position: moduleData.position,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the module.");
      }

      onSave();
      setOpen(false);
    } catch (err) {
      console.error("[EDIT_MODULE_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Module</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="moduleTitle">Module Title</Label>
            <Input
              id="moduleTitle"
              className="col-span-3"
              placeholder="Enter the Module Title"
              value={moduleData.title}
              onChange={(e) =>
                setModuleData({ ...moduleData, title: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="moduleDescription">Module Description</Label>
            <Input
              id="moduleDescription"
              className="col-span-3"
              placeholder="Enter the Module Description"
              value={moduleData.description}
              onChange={(e) =>
                setModuleData({ ...moduleData, description: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              className="col-span-3"
              placeholder="Enter Video URL"
              value={moduleData.videoUrl}
              onChange={(e) =>
                setModuleData({ ...moduleData, videoUrl: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transcript">Transcript</Label>
            <Input
              id="transcript"
              className="col-span-3"
              placeholder="Enter Transcript"
              value={moduleData.transcript}
              onChange={(e) =>
                setModuleData({ ...moduleData, transcript: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Material Links</Label>
            {moduleData.materialLinks.map((material, index) => (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Input
                  value={material}
                  onChange={(e) => handleMaterialChange(index, e.target.value)}
                  placeholder="Enter material link"
                />
                <Button variant="outline" onClick={() => removeMaterial(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" className="mt-2" onClick={addMaterial}>
              Add Material Link
            </Button>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              className="col-span-3"
              placeholder="Enter the Module Position"
              value={moduleData.position}
              onChange={(e) =>
                setModuleData({ ...moduleData, position: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading || !moduleData.title || !moduleData.position}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};
