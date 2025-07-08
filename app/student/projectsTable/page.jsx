"use client";

import React from "react";
import ProjectsTablePage from "@/components/student/projectsTable";


export default function Home() {
    return (
      <div className="dark:bg-slate-100 bg-slate-300 p-8">
        <ProjectsTablePage/>
      </div>
    );
  }