export interface Event {
    id: string;
    title: string;
    description: string;
    problemStatement: string;
    evaluationCriteria: string;
    eligibility: string;
    startDateTime: string;
    endDateTime: string;
  }
  
  export interface ManageEventDialogProps {
    eventType: "hackathon" | "contest";
    eventData: Event;
    onSave: (updatedEvent: Event) => void;
  }
  



  export const hackathons = [
    {
      id: "1",
      title: "Hackathon 2025",
      description: "A hackathon to solve real-world problems.",
      problemStatement: "Build a solution for climate change.",
      evaluationCriteria: "Innovation, Usability, Scalability",
      eligibility: "Open to all developers.",
      startDateTime: "2025-01-15T10:00",
      endDateTime: "2025-01-16T18:00",
    },
    {
      id: "2",
      title: "AI Innovation Hackathon",
      description: "An AI-focused hackathon for creating intelligent systems.",
      problemStatement: "Develop an AI system for personalized learning.",
      evaluationCriteria: "Innovation, Technical Feasibility, Presentation",
      eligibility: "Open to all AI enthusiasts.",
      startDateTime: "2025-02-01T09:00",
      endDateTime: "2025-02-02T18:00",
    },
  ];
  
  export const contests = [
    {
      id: "1",
      title: "CodeSprint Challenge",
      description: "A 24-hour competitive coding challenge.",
      problemStatement: "Solve algorithmic problems efficiently.",
      evaluationCriteria: "Accuracy, Speed, Scalability",
      eligibility: "Open to all programmers.",
      startDateTime: "2025-03-10T08:00",
      endDateTime: "2025-03-11T08:00",
    },
    {
      id: "2",
      title: "Designathon 2025",
      description: "A UX/UI design contest to showcase creativity.",
      problemStatement: "Redesign the interface of a social media app.",
      evaluationCriteria: "Creativity, Usability, Aesthetics",
      eligibility: "Open to all designers.",
      startDateTime: "2025-04-01T10:00",
      endDateTime: "2025-04-02T16:00",
    },
  ];
  