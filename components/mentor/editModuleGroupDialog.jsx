"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

export const EditModuleGroupDialog = ({ group }) => {
  const { userType, token } = useSelector((state) => state.auth);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(group.title || "");
  const [description, setDescription] = useState(group.description || "");
  const [position, setPosition] = useState(group.position || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/modulegroup/${group.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({
            title,
            description,
            position,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update module group.");
      }

      window.location.reload();
      setOpen(false);
    } catch (err) {
      console.error("[EDIT_MODULE_GROUP_ERROR]", err);
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
          <DialogTitle>Edit Module Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="moduleTitle">Module Title</Label>
            <Input
              id="moduleTitle"
              className="col-span-3"
              placeholder="Enter the Module Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="moduleDescription">Module Description</Label>
            <Input
              id="moduleDescription"
              className="col-span-3"
              placeholder="Enter the Module Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              className="col-span-3"
              placeholder="Enter the Module Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={loading || !title || !position}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};
