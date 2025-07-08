import * as React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Course {
  id: number; // Added the `id` property
  courseName: string;
  courseBy: string;
  progress: number;
  duration: string;
  
}

interface ExploreCoursesProps {
  course: Course;
}

export function MyCourses({ course }: ExploreCoursesProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/student/learningDashboard/${course.id}`); // Navigate to the dynamic route
  };

  return (
    <div className="w-[350px] m-4">
      <Card className="bg-purple-100">
        <CardHeader>
          <CardTitle>{course.courseName}</CardTitle>
          <CardDescription className="pb-4">Course by {course.courseBy}</CardDescription>
          <Progress value={course.progress} className="w-full -z-50" />
          {/* <p className="text-xs">{course.progress}% completed</p> */}
        </CardHeader>
        <CardContent>
          <div>
            {/* <p>Duration: {course.duration}</p> */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleViewDetails}>Go to Course</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
