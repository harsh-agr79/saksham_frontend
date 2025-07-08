'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CreateEnvironmentDialog = ({ objects, onCreate }) => {
  const [title, setTitle] = useState("");
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleObjectSelection = (objectId) => {
    setSelectedObjects((prev) =>
      prev.includes(objectId)
        ? prev.filter((id) => id !== objectId)
        : [...prev, objectId]
    );
  };

  const handleCreate = () => {
    const selectedObjectDetails = objects.filter((obj) => selectedObjects.includes(obj.id));
    onCreate({ title, objects: selectedObjectDetails });
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setSelectedObjects([]);
    setIsDropdownOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Environment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create 3D Environment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Title Input */}
          <div>
            <Label htmlFor="title">Environment Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter environment title"
            />
          </div>

          {/* Multi-Select Dropdown */}
          <div>
            <Label>Select 3D Objects</Label>
            <div className="relative">
              <div
                className="border rounded-md p-2 cursor-pointer"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              >
                {selectedObjects.length === 0 ? (
                  <span className="text-gray-500">Select objects</span>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedObjects.map((id) => {
                      const object = objects.find((obj) => obj.id === id);
                      return (
                        <span
                          key={id}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {object?.name}
                          <button
                            type="button"
                            onClick={() => toggleObjectSelection(id)}
                            className="text-sm font-bold"
                          >
                            &times;
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              {isDropdownOpen && (
                <ul className="absolute z-10 mt-2 max-h-48 w-full overflow-y-auto bg-white border rounded-md shadow-md">
                  {objects.map((obj) => (
                    <li
                      key={obj.id}
                      className={`px-4 py-2 cursor-pointer ${
                        selectedObjects.includes(obj.id) ? "bg-blue-100" : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleObjectSelection(obj.id)}
                    >
                      {obj.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter>
          <Button
            onClick={handleCreate}
            disabled={!title || selectedObjects.length === 0}
            className="bg-green-600 text-white"
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEnvironmentDialog;
