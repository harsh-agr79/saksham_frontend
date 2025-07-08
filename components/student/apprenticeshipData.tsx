export interface Apprenticeship {
    id: number;
    company_id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    start_date: string; // ISO Date String
    end_date: string; // ISO Date String
    application_deadline: string; // ISO Date String
    special_requirements: string;
    skills_required: string[];
    created_at: string; // ISO Date String
    updated_at: string; // ISO Date String
    domain_id: string;
    subdomains: number[];
  }
  

  const apprenticeships: Apprenticeship[] = [
    {
      id: 1,
      company_id: "1",
      title: "Software Developer Internship",
      description: "Work with a team to develop web applications.",
      type: "apprenticeship",
      location: "Remote",
      start_date: "2025-01-01T00:00:00.000000Z",
      end_date: "2025-06-30T00:00:00.000000Z",
      application_deadline: "2025-12-15T00:00:00.000000Z",
      special_requirements: "Must have prior experience with Laravel.",
      skills_required: ["PHP", "Laravel", "Teamwork"],
      created_at: "2024-11-26T16:34:54.000000Z",
      updated_at: "2024-11-26T16:34:54.000000Z",
      domain_id: "1",
      subdomains: [2, 3],
    },
  ];
  
  export default apprenticeships;
    