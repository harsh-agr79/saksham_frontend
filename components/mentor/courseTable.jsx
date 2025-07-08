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
import { EditCourseDialog } from "./editCourseDialog.jsx";


export function CourseTable({ courses, onSaveCourse }) {
  const handleCourseUpdate = (updatedCourse) => {
    onSaveCourse(updatedCourse); // Call parent handler to update the state
  };

  return (
    <Table className="bg-purple-100">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={course.id}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.domain_name}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/mentor/manageCourses/${course.id}`}>
                  <Button>Manage</Button>
                </Link>
                <EditCourseDialog
                  course={course}
                  onCourseUpdated={handleCourseUpdate}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
