import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ExploreCourses = ({ course }) => {
  const router = useRouter();
  const { userType, token } = useSelector((state) => state.auth);

  const handleViewDetails = () => {
    router.push(`/${userType}/courses/${course.id}`);
  };

  return (
    <div className="w-[350px] m-4">
      <Card className="bg-purple-100">
        <CardHeader>
          <CardTitle>{course.courseName}</CardTitle>
          <CardDescription>Course by {course.courseBy}</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <p>{course.enrolled} students currently enrolled</p>
            <p>{course.completed} students completed the course</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleViewDetails}>View Details</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExploreCourses;
