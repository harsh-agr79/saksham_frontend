"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";

const AddModuleDialog = ({ courseId, groups, onModuleAdded }) => {
  const { userType, token } = useSelector((state) => state.auth);

  const [moduleData, setModuleData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    transcript: "",
    position: "",
    materialLinks: [""],
    groupId: "",
    duration: "",
    learningObjectives: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleMaterialChange = (index, value) => {
    const updatedMaterials = [...moduleData.materialLinks];
    updatedMaterials[index] = value;
    setModuleData((prev) => ({
      ...prev,
      materialLinks: updatedMaterials,
    }));
  };

  const addMaterial = () => {
    setModuleData((prev) => ({
      ...prev,
      materialLinks: [...prev.materialLinks, ""],
    }));
  };

  const removeMaterial = (index) => {
    const updatedMaterials = moduleData.materialLinks.filter((_, i) => i !== index);
    setModuleData((prev) => ({
      ...prev,
      materialLinks: updatedMaterials,
    }));
  };

  const handleVideoUpload = async (file) => {
    setUploading(true);
    setError("");
  
    try {
      const formData = new FormData();
      formData.append("video", file); // 'video' matches the multer field name in the server file
  
      // Upload the video to the server
      const uploadResponse = await fetch(`https://videosih.startuplair.com/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload video");
      }
  
      const uploadData = await uploadResponse.json();
      const fileId = uploadData.data?.id; // Assuming the server response contains file ID in `data.id`
  
      if (!fileId) {
        throw new Error("File ID not received from server");
      }
  
      // Generate a public URL for the uploaded video
      const urlResponse = await fetch(`https://videosih.startuplair.com/generate-url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileId }),
      });
  
      if (!urlResponse.ok) {
        throw new Error("Failed to generate public URL for the video");
      }
  
      const urlData = await urlResponse.json();
      const publicUrl = urlData.data?.webViewLink; // Adjust based on server response structure
      console.log(publicUrl);
      if (!publicUrl) {
        throw new Error("Public URL not received from server");
      }
  
      setModuleData((prev) => ({ ...prev, videoUrl: publicUrl }));
    } catch (err) {
      console.error("Video upload error:", err);
      setError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/module/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            course_id: courseId,
            group_id: moduleData.groupId || null,
            title: moduleData.title,
            description: moduleData.description,
            video_url: moduleData.videoUrl,
            transcript: moduleData.transcript,
            material_links: moduleData.materialLinks.filter((link) => link.trim() !== ""),
            position: moduleData.position,
            duration: moduleData.duration,
            learning_objectives: moduleData.learningObjectives,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add module.");
      }

      if (onModuleAdded) onModuleAdded();

      setModuleData({
        title: "",
        description: "",
        videoUrl: "",
        transcript: "",
        position: "",
        materialLinks: [""],
        groupId: "",
        duration: "",
        learningObjectives: "",
      });
    } catch (err) {
      console.error("[ADD_MODULE_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog className = "bg-purple-100">
      <DialogTrigger asChild>
        <Button className="font-semibold">Add New Module</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Module</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Module Title</Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="Enter the Module Title"
              value={moduleData.title}
              onChange={(e) => setModuleData({ ...moduleData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Module Description</Label>
            <Textarea
              id="description"
              className="col-span-3"
              placeholder="Enter the Module Description"
              value={moduleData.description}
              onChange={(e) => setModuleData({ ...moduleData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="video">Upload Video</Label>
            <Input
              id="video"
              type="file"
              accept="video/mp4"
              className="col-span-3"
              onChange={(e) => handleVideoUpload(e.target.files[0])}
            />
          </div>
          {uploading && <p className="text-blue-600">Uploading video...</p>}
          {moduleData.videoUrl && <p className="text-green-600">Video uploaded successfully!</p>}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              className="col-span-3"
              placeholder="Enter the Module Duration"
              value={moduleData.duration}
              onChange={(e) => setModuleData({ ...moduleData, duration: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transcript">Module Transcript</Label>
            <Textarea
              id="transcript"
              className="col-span-3"
              placeholder="Enter Module Transcript"
              value={moduleData.transcript}
              onChange={(e) => setModuleData({ ...moduleData, transcript: e.target.value })}
            />
          </div>

          <div>
            <Label>Material Links</Label>
            {moduleData.materialLinks.map((material, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={material}
                  onChange={(e) => handleMaterialChange(index, e.target.value)}
                  placeholder="Enter material link"
                />
                <Button variant="outline" type="button" onClick={() => removeMaterial(index)}>
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addMaterial}>
              Add Material Link
            </Button>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="groupId">Group</Label>
            <Select
              onValueChange={(value) => setModuleData({ ...moduleData, groupId: value })}
              value={moduleData.groupId}
            >
              <SelectTrigger id="groupId">
                <SelectValue placeholder="Select Group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              className="col-span-3"
              placeholder="Enter the Module Position"
              value={moduleData.position}
              onChange={(e) => setModuleData({ ...moduleData, position: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              setModuleData({
                title: "",
                description: "",
                videoUrl: "",
                transcript: "",
                position: "",
                materialLinks: [""],
                groupId: "",
                duration: "",
              })
            }
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !moduleData.videoUrl}
          >
            {loading ? "Saving..." : "Save Module"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default AddModuleDialog;