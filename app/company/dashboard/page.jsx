'use client';

import { useEffect } from "react";
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

export default function MentorDashboard() {
  // Code to protect the route
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userType !== "company") {
      router.replace("/"); // Redirect to home if not authenticated or not a mentor
    }
  }, [isAuthenticated, userType, router]);

  // Dummy data for the cards
  const data = [
    {
      title: "My Courses",
      items: [
        {
          title: "React Advanced",
          description: "Ongoing - Master React.js skills",
          link: "/mentorCourses",
        },
        {
          title: "UI/UX Principles",
          description: "Completed - Basics of UI/UX design",
          link: "/mentorCourses",
        },
      ],
    },
    {
      title: "My 3D Environment",
      items: [
        {
          title: "3D Modeling Basics",
          description: "Learn the foundations of 3D modeling and design techniques.",
          link: "/mentor3DEnvironment",
        },
        {
          title: "Advanced 3D Techniques",
          description: "Master complex 3D modeling and rendering skills.",
          link: "/mentor3DEnvironment",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 py-8">
      {data.map((section, sectionIndex) => (
        <Card
          key={sectionIndex}
          className="shadow-xl p-8 bg-seashell border border-gray-300 rounded-lg transition-transform hover:scale-105 hover:shadow-2xl"
        >
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {section.items.length > 0 ? (
              <div className="flex flex-col gap-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex flex-col p-4 border rounded-md shadow-sm bg-gray-50"
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="flex justify-end ">
                      <Button size="sm" onClick={() => window.location.href = item.link} className="ring ring-blue-300 hover:ring-blue-500">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">This section contains no specific details yet.</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
