"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { NewCourseDialog } from "@/components/mentor/newCourseDialog";
import { CourseTable } from "@/components/mentor/courseTable.jsx";

const Home = () => {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if the user is not authenticated or not a mentor
  useEffect(() => {
    if (!isAuthenticated || userType !== "mentor") {
      router.replace("/");
    }
  }, [isAuthenticated, userType, router]);

  // Function to fetch courses
  const fetchCourses = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses. Please try again later.");
      }

      const data = await response.json();
      setCourses(data || []);
    } catch (error) {
      console.error("[FETCH_COURSES_ERROR]", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    if (isAuthenticated && userType === "mentor") {
      fetchCourses();
    }
  }, [isAuthenticated, userType, token]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-3xl font-bold">Uploaded Courses</h1>
        <NewCourseDialog onCourseAdded={fetchCourses} /> {/* Pass fetchCourses as a prop */}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading courses...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : courses.length > 0 ? (
        <CourseTable courses={courses} />
      ) : (
        <div className="text-center text-gray-500">
          <p>No courses available.</p>
          <p className="text-sm">Click "Add New Course" to upload your first course!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
