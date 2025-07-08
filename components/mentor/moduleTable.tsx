import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AddModuleGroupDialog } from "./addModuleGroupDialog";
import { EditModuleDialog } from "./editModuleDialog.jsx";
import { group } from "console";

interface Course {
  id: number;
  courseId : string;
  title: string;
  description: string;
  position: string;
}

interface CourseTableProps {
  modules: Course[];
}

export function ModuleTable({ modules }: CourseTableProps) {

  return (
    <Table className="bg-[#FFF5EE]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {modules.map((course) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{course.id}</TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.description}</TableCell>
            <TableCell>{course.position}</TableCell>
            <TableCell className="text-right">
                <EditModuleDialog module={course}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
