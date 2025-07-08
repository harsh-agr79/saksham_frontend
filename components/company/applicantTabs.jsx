"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ApplicantRow from "@/components/company/applicantRow.jsx";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";

const ApplicantTabs = () => {
  const { token, userType } = useSelector((state) => state.auth);
  const params = useParams(); // Access URL parameters
  const { id } = params; // Extract the specific `id` from params

  const [unprocessedApplicants, setUnprocessedApplicants] = useState([]);
  const [shortlistedApplicants, setShortlistedApplicants] = useState([]);
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApplicants = async (endpoint, setState) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/job/${id}/applicants/${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch applicants.");
      }

      const data = await response.json();
      console.log(data);
      setState(data.applicants);
    } catch (err) {
      console.error(`[FETCH_${endpoint.toUpperCase()}_ERROR]`, err);
      setError("Failed to load applicants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && id) {
      fetchApplicants("unprocessed", setUnprocessedApplicants);
      fetchApplicants("shortlisted", setShortlistedApplicants);
      fetchApplicants("final-selected", setSelectedApplicants);
    }
  }, [token, id]); // Re-run when token or id changes

  const handleShortlist = (applicant) => {
    setUnprocessedApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
    setShortlistedApplicants((prev) => [...prev, applicant]);
  };

  const handleSelect = (applicant) => {
    setShortlistedApplicants((prev) => prev.filter((a) => a.id !== applicant.id));
    setSelectedApplicants((prev) => [...prev, applicant]);
  };

  if (loading) {
    return <p>Loading applicants...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <Tabs defaultValue="unprocessed" >
      <TabsList>
        <TabsTrigger value="unprocessed">Unprocessed Applicants</TabsTrigger>
        <TabsTrigger value="shortlisted">Shortlisted Applicants</TabsTrigger>
        <TabsTrigger value="selected">Selected Applicants</TabsTrigger>
      </TabsList>

      {/* Unprocessed Applicants */}
      <TabsContent value="unprocessed">
        {unprocessedApplicants.length === 0 ? (
          <p>No unprocessed applicants.</p>
        ) : (
          unprocessedApplicants.map((applicant) => (
            <ApplicantRow
              key={applicant.id}
              applicant={applicant}
              actionText="Shortlist"
              onAction={() => handleShortlist(applicant)}
            />
          ))
        )}
      </TabsContent>

      {/* Shortlisted Applicants */}
      <TabsContent value="shortlisted">
        {shortlistedApplicants.length === 0 ? (
          <p>No shortlisted applicants.</p>
        ) : (
          shortlistedApplicants.map((applicant) => (
            <ApplicantRow
              key={applicant.id}
              applicant={applicant}
              actionText="Select"
              onAction={() => handleSelect(applicant)}
            />
          ))
        )}
      </TabsContent>

      {/* Selected Applicants */}
      <TabsContent value="selected">
        {selectedApplicants.length === 0 ? (
          <p>No selected applicants.</p>
        ) : (
          selectedApplicants.map((applicant) => (
            <ApplicantRow key={applicant.id} applicant={applicant} />
          ))
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ApplicantTabs;
