'use client';

import ExploreCourses from "@/components/student/exploreCourse.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated || userType !== "student") {
      router.replace("/"); // Redirect if not authenticated or not a student
    } else {
      // Fetch courses
      const fetchCourses = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/getcourses`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // API key from environment variable
                Authorization: `Bearer ${token}`, // Bearer token from state
              },
            }
          );

          const data = await res.json();

          if (res.ok) {
            setCourses(data); // Assuming the API returns an array of courses
          } else {
            setMessage(data.message || "Failed to fetch courses");
          }
        } catch (error) {
          console.error("[FETCH_COURSES]", error);
          setMessage("An error occurred while fetching courses.");
        }
      };

      fetchCourses();
    }
  }, [isAuthenticated, userType, token, router]);

  return (
    <div>
      <h1 className="text-center text-4xl pb-5 pt-5 font-bold">Explore Courses</h1>
      <div className="flex justify-center flex-wrap">
        {message ? (
          <p className="text-center text-lg mt-10">{message}</p>
        ) : courses.length > 0 ? (
          courses.map((course) => (
            <ExploreCourses key={course.id} course={course} />
          ))
        ) : (
          <p className="text-center text-lg mt-10">No courses available</p>
        )}
      </div>
    </div>
  );
}
