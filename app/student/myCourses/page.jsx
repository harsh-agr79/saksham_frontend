'use client';

import { MyCourses } from "@/components/student/myCourses";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated || userType !== "student") {
      router.replace("/");
      return;
    }

    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/mycourses`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY, // API key from environment variables
              Authorization: `Bearer ${token}`, // Bearer token from Redux store
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setCourses(data); // Assuming API returns an array of courses
        } else {
          setMessage(data.message || "Failed to fetch courses.");
        }
      } catch (error) {
        console.error("[FETCH_COURSES_ERROR]", error);
        setMessage("An error occurred while fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [isAuthenticated, userType, token, router]);

  if (!isAuthenticated || userType !== "student") {
    return null; // Prevent rendering if redirecting
  }

  return (
    <div>
      <h1 className="text-center text-4xl pb-5 pt-5 font-bold">My Courses</h1>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : courses.length > 0 ? (
          courses.map((course) => <MyCourses key={course.id} course={course} />)
        ) : (
          <p className="text-center text-lg">{message || "No courses found."}</p>
        )}
      </div>
    </div>
  );
}
