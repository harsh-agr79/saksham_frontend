"use client";

import ApplicantTabs from "@/components/company/applicantTabs.jsx";

export default function ManageApprenticeshipPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Apprenticeship</h1>
      <ApplicantTabs
        unprocessedApplicants={[
          { id: 1, name: "Alice Smith", submission: "link-to-resume-1" },
          { id: 2, name: "Bob Johnson", submission: "link-to-resume-2" },
        ]}
        shortlistedApplicants={[
          { id: 3, name: "Charlie Brown", submission: "link-to-resume-3" },
        ]}
        selectedApplicants={[
          { id: 4, name: "Diana Prince", submission: "link-to-resume-4" },
        ]}
      />
    </div>
  );
}
