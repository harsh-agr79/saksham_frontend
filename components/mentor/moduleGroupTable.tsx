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
import { EditModuleGroupDialog } from "./editModuleGroupDialog.jsx";
import { group } from "console";

interface Course {
  id: number;
  courseId : string;
  title: string;
  description: string;
  position: string;
}

interface CourseTableProps {
  groups: Course[];
}

export function ModuleGroupTable({ groups }: CourseTableProps) {
  return (
    <Table className="bg-[#FFF5EE]">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No</TableHead>
          <TableHead>Module Group Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => (
          <TableRow key={group.id}>
            <TableCell className="font-medium">{group.id}</TableCell>
            <TableCell>{group.title}</TableCell>
            <TableCell>{group.description}</TableCell>
            <TableCell>{group.position}</TableCell>
            <TableCell className="text-right">
               <EditModuleGroupDialog group={group}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
