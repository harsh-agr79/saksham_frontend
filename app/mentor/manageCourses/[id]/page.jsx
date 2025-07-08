"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AddModuleGroupDialog } from "@/components/mentor/addModuleGroupDialog.jsx";
import { ModuleGroupTable } from "@/components/mentor/moduleGroupTable";
import AddModuleDialog from "@/components/mentor/addModuleDialog.jsx";
import { ModuleTable } from "@/components/mentor/moduleTable";
import { AddAssignment } from "@/components/mentor/addAssignment.jsx";
import { AssignmentTable } from "@/components/mentor/assignmentTable";

export default function ManageCoursePage({ params }) {
  const { id: courseId } = params; // Extract courseId
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect unauthorized users
  useEffect(() => {
    if (!isAuthenticated || userType !== "mentor") {
      router.replace("/");
    }
  }, [isAuthenticated, userType, router]);

  // Fetch course data
  const fetchCourseData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/mentor/course/${courseId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch course data.");
      }

      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("[FETCH_COURSE_DATA_ERROR]", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userType === "mentor") {
      fetchCourseData();
    }
  }, [isAuthenticated, userType, token, courseId]);

  // Handle after adding or editing module groups, modules, or assignments
  const handleDataRefresh = () => {
    fetchCourseData();
  };

  if (loading) {
    return <p className="text-center">Loading course data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!courseData) {
    return <p className="text-center">No course data available.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="side-margins">
        {/* Module Groups Section */}
        <div className="flex justify-between p-5">
          <h2 className="text-3xl font-bold">Manage Module Groups</h2>
          <AddModuleGroupDialog courseId={courseId} onModuleGroupAdded={handleDataRefresh} />
        </div>
        <ModuleGroupTable groups={courseData.module_groups} />

        {/* Modules Section */}
        <div className="flex justify-between p-5">
          <h2 className="text-3xl font-bold">Manage Modules</h2>
          <AddModuleDialog courseId={courseId} groups={courseData.module_groups} onModuleAdded={handleDataRefresh} />
        </div>
        <ModuleTable modules={courseData.modules} />

        {/* Assignments Section */}
        <div className="flex justify-between p-5">
          <h2 className="text-3xl font-bold">Manage Assignments</h2>
          <AddAssignment courseId={courseId} modules={courseData.modules} onAssignmentAdded={handleDataRefresh} />
        </div>
        <AssignmentTable assignments={courseData.assignmentsQuizzes} />
      </div>
    </div>
  );
}
