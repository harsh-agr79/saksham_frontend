import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Module {
  id: string;
  title: string;
  position: string;
}

interface ModuleData {
  title: string;
  videoUrl: string;
  description: string;
  transcript: string;
  materials: string[];
  position: string;
}

interface ManageCoursesProps {
  courseId: string;
  modules: Module[];
}

export function ManageCourses({ courseId, modules }: ManageCoursesProps) {
  const [moduleId, setModuleId] = useState<string>("");
  const [moduleData, setModuleData] = useState<ModuleData>({
    title: "",
    videoUrl: "",
    description: "",
    transcript: "",
    materials: [""],
    position: "",
  });

  const handleMaterialChange = (index: number, value: string) => {
    const updatedMaterials = [...moduleData.materials];
    updatedMaterials[index] = value;
    setModuleData((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));
  };

  const addMaterial = () => {
    setModuleData((prev) => ({
      ...prev,
      materials: [...prev.materials, ""],
    }));
  };

  const removeMaterial = (index: number) => {
    const updatedMaterials = moduleData.materials.filter((_, i) => i !== index);
    setModuleData((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitting Module Data:", moduleData);
  };

  return (
    <Card className="w-full bg-[#FFF5EE]">
      <CardHeader>
        <CardTitle>Manage Course</CardTitle>
        <CardDescription>Edit details for Course ID: {courseId}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="courseId">Course ID</Label>
              <Input id="courseId" value={courseId} disabled />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="moduleId">Module Number</Label>
              <Select onValueChange={setModuleId}>
                <SelectTrigger id="moduleId">
                  <SelectValue placeholder="Select a Module" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      Module {module.position}: {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Module Title</Label>
              <Input
                id="title"
                value={moduleData.title}
                onChange={(e) =>
                  setModuleData({ ...moduleData, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="videoUrl">Video URL</Label>
              <Input
                id="videoUrl"
                value={moduleData.videoUrl}
                onChange={(e) =>
                  setModuleData({ ...moduleData, videoUrl: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={moduleData.description}
                onChange={(e) =>
                  setModuleData({ ...moduleData, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Transcript</Label>
              <Textarea
                value={moduleData.transcript}
                onChange={(e) =>
                  setModuleData({ ...moduleData, transcript: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Material Links</Label>
              {moduleData.materials.map((material, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={material}
                    onChange={(e) => handleMaterialChange(index, e.target.value)}
                    placeholder="Enter material link"
                  />
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => removeMaterial(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addMaterial}>
                Add Material Link
              </Button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="position">Module Position</Label>
              <Input
                id="position"
                value={moduleData.position}
                onChange={(e) =>
                  setModuleData({ ...moduleData, position: e.target.value })
                }
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}  