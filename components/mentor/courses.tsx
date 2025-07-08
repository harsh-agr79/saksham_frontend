// Interfaces for dummy data

export interface MaterialLinks {
    link: string;
  }
  
  export interface Modulee {
    id: string;
    groupId: number | null;
    courseId: string;
    title: string;
    videoUrl: string;
    description: string;
    transcript: string;
    materialLinks: string[];
    position: string;
  }
  
  export interface ModuleGroup {
    id: number;
    courseId: string;
    title: string;
    description: string;
    position: string;
  }
  
  export interface AssignmentQuiz {
    id: number;
    moduleId: string;
    type: "quiz" | "assignment";
    title: string;
    description: string;
    content: {
      questions: {
        id?: number;
        question: string;
        type?: string; // For assignments
        options?: string[]; // For quizzes
        answer?: string; // For quizzes
      }[];
    };
    dueDate: string;
  }
  
  export interface CourseData {
    id: number;
    courseName: string;
    courseBy: string;
    completed: string;
    enrolled: string;
    description: string;
    moduleGroups: ModuleGroup[];
    modules: Modulee[];
    assignmentsQuizzes: AssignmentQuiz[];
  }
  
  // Dummy Data
  
  export const dummyData: CourseData = {
    id: 4,
    courseName: "Updated Web Development",
    courseBy: "Harsh",
    completed: "0",
    enrolled: "1",
    description: "Updated course description.",

    moduleGroups: [
      {
        id: 1,
        courseId: "4",
        title: "Introduction Group",
        description: "Updated description for the group.",
        position: "2",
      },
      {
        id: 4,
        courseId: "4",
        title: "Introduction to Basic Topics",
        description: "This group covers foundational topics for advanced learning.",
        position: "1",
      },
    ],

    modules: [
      {
        id: "3",
        groupId: 1,
        courseId: "4",
        title: "Getting Started with Laravel",
        videoUrl: "https://example.com/intro-video.mp4",
        description: "Learn the basics of Laravel framework.",
        transcript: "This is a transcript of the video.",
        materialLinks: ["https://example.com/resource1", "https://example.com/resource2"],
        position: "1",
      },
      {
        id: "4",
        groupId: 4,
        courseId: "4",
        title: "Getting Started with Laravel",
        videoUrl: "https://example.com/intro-video.mp4",
        description: "Learn the basics of Laravel framework.",
        transcript: "This is a transcript of the video.",
        materialLinks: ["https://example.com/resource1", "https://example.com/resource2"],
        position: "2",
      },
      {
        id: "5",
        groupId: 4,
        courseId: "4",
        title: "Getting Started with Laravel",
        videoUrl: "https://example.com/intro-video.mp4",
        description: "Learn the basics of Laravel framework.",
        transcript: "This is a transcript of the video.",
        materialLinks: ["https://example.com/resource1", "https://example.com/resource2"],
        position: "3",
      },
      {
        id: "6",
        groupId: null,
        courseId: "4",
        title: "Getting Started with Laravel",
        videoUrl: "https://example.com/intro-video.mp4",
        description: "Learn the basics of Laravel framework.",
        transcript: "This is a transcript of the video.",
        materialLinks: ["https://example.com/resource1", "https://example.com/resource2"],
        position: "4",
      },
      {
        id: "1",
        groupId: 1,
        courseId: "3",
        title: "Updated Module Title",
        videoUrl: "https://example.com/updated-video.mp4",
        description: "Updated module description.",
        transcript: "Updated transcript text.",
        materialLinks: ["https://example.com/resource1", "https://example.com/resource2"],
        position: "5",
      },
    ],
    assignmentsQuizzes: [
      {
        id: 1,
        moduleId: "1",
        type: "quiz",
        title: "Quiz on JavaScript",
        description: "Test your knowledge of JavaScript basics.",
        content: {
          questions: [
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
          ],
        },
        dueDate: "2024-12-01 23:59:59",
      },
      {
        id: 7,
        moduleId: "1",
        type: "assignment",
        title: "Introduction to HTML Assignment",
        description: "This assignment covers basic HTML tags and their usage.",
        content: {
          questions: [
            {
              id: 1,
              question: "What is the purpose of the <head> tag in HTML?",
              type: "text",
            },
            {
              id: 2,
              question: "Create a basic HTML document structure.",
              type: "file",
            },
          ],
        },
        dueDate: "2024-11-30 23:59:59",
      },
      {
        id: 3,
        moduleId: "3",
        type: "quiz",
        title: "Quiz on JavaScript",
        description: "Test your knowledge of JavaScript basics.",
        content: {
          questions: [
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
          ],
        },
        dueDate: "2024-12-01 23:59:59",
      },
      {
        id: 4,
        moduleId: "4",
        type: "quiz",
        title: "Quiz on JavaScript",
        description: "Test your knowledge of JavaScript basics.",
        content: {
          questions: [
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
          ],
        },
        dueDate: "2024-12-01 23:59:59",
      },
      {
        id: 5,
        moduleId: "5",
        type: "quiz",
        title: "Quiz on JavaScript",
        description: "Test your knowledge of JavaScript basics.",
        content: {
          questions: [
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
          ],
        },
        dueDate: "2024-12-01 23:59:59",
      },
      {
        id: 6,
        moduleId: "6",
        type: "quiz",
        title: "Quiz on JavaScript",
        description: "Test your knowledge of JavaScript basics.",
        content: {
          questions: [
            {
              question: "What is JavaScript?",
              options: ["Language", "Library"],
              answer: "Language",
            },
          ],
        },
        dueDate: "2024-12-01 23:59:59",
      },
    ],
  };
  