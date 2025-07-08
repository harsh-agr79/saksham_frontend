import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CourseDescription({ course }) {
  const router = useRouter();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extract authentication state
  const { userType, token } = useSelector((state) => state.auth);

  const handleEnroll = async () => {
    if (!course) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/courses/enroll`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // Ensure API key is set
            Authorization: `Bearer ${token || ""}`, // Ensure token is set
          },
          body: JSON.stringify({ course_id: course.id }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        setIsEnrolled(true);
        console.log("Enrollment successful:", data);
        router.push('/student/myCourses')
      } else {
        console.error("Enrollment failed:", data.message || "Unknown error");
      }
    } catch (error) {
      console.error("[ENROLL_ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full bg-purple-100">
      <CardHeader>
        <CardTitle className="text-4xl">{course.courseName}</CardTitle>
        <CardDescription> - Course By {course.courseBy}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-right text-sm">{course.enrolled} students currently enrolled</p>
          <p className="text-right text-sm">{course.completed} students completed the course</p>
        </div>
        <div className="font-semibold pb-4 pt-4 w-81 text-1xl">{course.description}</div>
        <div>
          {course.module_groups?.length > 0 ? (
            course.module_groups.map((group) => (
              <div key={group.id} className="pb-3">
                <p className="text-1xl font-medium pb-3">Module Group {group.id}</p>
                {group.modules.map((module) => (
                  <p key={module.id} className="text-sm font-medium pb-1">
                    {module.module_name}
                  </p>
                ))}
              </div>
            ))
          ) : (
            <p>No module groups available.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleEnroll} disabled={isEnrolled || loading}>
          {isEnrolled ? "Enrolled" : loading ? "Processing..." : "Enroll"}
        </Button>
      </CardFooter>
    </Card>
  );
}
