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
import { useSelector } from "react-redux";

export function AddModuleGroupDialog({ courseId, onModuleGroupAdded }) {
  const { userType, token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false); // Controls dialog visibility
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    position: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.position) {
      setError("Title and Position are required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/modulegroup/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            course_id: courseId,
            ...formData,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add module group.");
      }

      // Call the parent function to refresh data
      if (onModuleGroupAdded) {
        onModuleGroupAdded();
      }

      // Close the dialog and reset form
      setFormData({ title: "", description: "", position: "" });
      setOpen(false);
    } catch (err) {
      console.error("[ADD_MODULE_GROUP_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} className = "bg-purple-100">
      <DialogTrigger asChild>
        <Button className="font-semibold">Add New Module Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Module Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title">Module Title</Label>
            <Input
              id="title"
              className="col-span-3"
              placeholder="Enter the Module Title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description">Module Description</Label>
            <Input
              id="description"
              className="col-span-3"
              placeholder="Enter the Module Description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              className="col-span-3"
              placeholder="Enter the Module Position"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !formData.title || !formData.position}
          >
            {loading ? "Creating..." : "Create Module"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
