'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { LearningDashboardSideNav } from "@/components/student/learningDashboardSideNav.jsx";

export default function Home() {
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const params = useParams(); // Fetch course ID from params
  const courseId = params?.id; // Dynamic course ID from URL
  const [mainContent, setMainContent] = useState(<p>Select an item to view details.</p>);
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || userType !== "student") {
      router.replace("/");
      return;
    }

    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/mycourses/details/${courseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setCourseDetails(data); // Ensure data is passed as an array for SideNav\
          setMainContent(`${data.courseName} ${data.courseBy} ${data.description}`)
        } else {
          console.error("Failed to fetch course details:", data.message || "Unknown error");
          setError(data.message || "Failed to load course details.");
        }
      } catch (error) {
        console.error("[FETCH_COURSE_DETAILS_ERROR]", error);
        setError("An error occurred while fetching course details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [isAuthenticated, userType, token, courseId, router]);

  if (!isAuthenticated || userType !== "student") {
    return null; // Prevent rendering if redirecting
  }

  return (
    <div className="flex h-screen">
      {courseDetails && (
        <LearningDashboardSideNav
          courses={courseDetails || []} // Dynamically fetched courses replace dummyData
          onContentChange={setMainContent}
        />
      )}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          mainContent || <p>Select an item to view details.</p>
        )}
      </div>
    </div>
  );
}
