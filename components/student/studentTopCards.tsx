import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CardsTop() {
  // Dummy data for the cards
  const data = [
    {
      title: "My Apprenticeships",
      items: [
        {
          title: "Web Developer Apprenticeship",
          description: "TechCorp - Duration: 6 months",
          link: "/myApprenticeships",
        },
        {
          title: "Software Engineer Intern",
          description: "DevStart - Duration: 3 months",
          link: "/myApprenticeships",
        },
      ],
    },
    {
      title: "My Courses",
      items: [
        {
          title: "React Basics",
          description: "Completed",
          link: "/myCourses",
        },
        {
          title: "Advanced CSS",
          description: "Ongoing",
          link: "/myCourses",
        },
      ],
    },
    {
      title: "My Events",
      items: [
        {
          title: "Web Dev Meetup 2023",
          description: "Attended",
          link: "/myEvents",
        },
        {
          title: "Tech Summit 2024",
          description: "Upcoming",
          link: "/myEvents",
        },
      ],
    },
    {
      title: "My Hackathons/Contests",
      items: [
        {
          title: "HackTheFuture 2023",
          description: "Won - 1st Place",
          link: "/myHackContest",
        },
        {
          title: "InnovateHack 2023",
          description: "Participated - Top 5",
          link: "/myHackContest",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {data.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="shadow-md p-6 transition-transform hover:scale-105 hover:shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="p-4 border rounded-md shadow-sm bg-gray-50"
                >
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={() => window.location.href = item.link}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
