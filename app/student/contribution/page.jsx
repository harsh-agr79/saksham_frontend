"use client";

import React from "react";
import ContributionGrid from "@/components/student/ContributionGrid";

export default function MainPage() {
  return (
    <div className="max-h-screen bg-gray-000 flex flex-col items-center justify-center p-4 sm:p-6">
      <header className="mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Platform Activity Tracker</h1>
        <p className="text-gray-600">Know How many times did you compile your code every day</p>
      </header>

      <main className="bg-white shadow-lg rounded-lg p-4 sm:p-8 w-full max-w-full sm:max-w-3xl lg:max-w-4xl overflow-x-auto">
        {/* Overflow on smaller screens, auto-scroll horizontally if needed */}
        <ContributionGrid />
      </main>
    </div>
  );
}
