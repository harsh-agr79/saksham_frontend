'use client';

import { Course } from '@/components/student/courses';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';

export function LearningDashboardSideNav({ courses, onContentChange }) {
  const { token, userType } = useSelector((state) => state.auth);

  const [activeModuleGroupId, setActiveModuleGroupId] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);

  const handleModuleGroupClick = (groupId) => {
    setActiveModuleGroupId(groupId === activeModuleGroupId ? null : groupId);
    setActiveModuleId(null);
    onContentChange(<p>Select a module to view its details.</p>);
  };

  const handleModuleClick = (moduleId, moduleDetails) => {
    setActiveModuleId(moduleId);
    onContentChange(
      <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold">{moduleDetails.title}</h2>
        <p className="text-gray-700">{moduleDetails.description}</p>
        {moduleDetails.videoUrl && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Video:</h3>
            <iframe
              src={moduleDetails.videoUrl.replace(/\/view.*$/, '/preview')}
              width="100%"
              height="480"
              allow="autoplay"
            ></iframe>
          </div>
        )}
      </div>
    );
  };

  const submitAssignment = async (assignmentId, answers) => {
    const formData = new FormData();
    formData.append('assignment_id', assignmentId);
    answers.forEach((answer, index) => {
      if (answer.file) {
        formData.append(`submission_content[answers][${index}][id]`, answer.id);
        formData.append(`submission_content[answers][${index}][file]`, answer.file);
      }
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/assignment/submit`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit assignment.');
      }
      alert('Assignment submitted successfully!');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Failed to submit assignment.');
    }
  };

  const submitQuiz = async (assignmentId, answers) => {
    const submissionPayload = {
      assignment_id: assignmentId,
      submission_content: { answers },
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/assignment/submit`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(submissionPayload),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit quiz.');
      }
      alert('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz.');
    }
  };

  const handleAssignmentClick = (assignment) => {
    const handleSubmit = () => {
      const answers = [
        {
          id: 1,
          file: document.getElementById('file-input-1').files[0],
        },
      ];
      submitAssignment(assignment.id, answers);
    };

    onContentChange(
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{assignment.title}</h2>
        <p className="mb-4">{assignment.description}</p>
        <input
          id="file-input-1"
          type="file"
          className="w-full p-2 border rounded-lg mb-4"
        />
        <Button onClick={handleSubmit}>Submit Assignment</Button>
      </div>
    );
  };

  const handleViewQuiz = (quiz) => {
    const handleSubmit = () => {
      const answers = quiz.content.questions.map((question, index) => ({
        id: question.id,
        answer: document.querySelector(
          `input[name="question-${index}"]:checked`
        )?.value,
      }));
      submitQuiz(quiz.id, answers);
    };

    onContentChange(
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
        <p className="mb-4">{quiz.description}</p>
        {quiz.content.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold mb-2">{`Q${index + 1}: ${
              question.question
            }`}</p>
            <div>
              {question.options.map((option, idx) => (
                <label key={idx} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={handleSubmit}>Submit Quiz</Button>
      </div>
    );
  };

  return (
    <Sidebar className="z-50 w-64 bg-gray-50 border-r h-full shadow">
      <SidebarTrigger className="absolute -right-12 top-2 p-5 flex justify-center items-center bg-white rounded-full shadow-md" />
      <ScrollArea className="h-full">
        <SidebarContent>
          <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Learning Dashboard</h1>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg font-semibold mb-4">
              {courses.courseName}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {courses.moduleGroups.map((group) => (
                  <SidebarMenuItem key={group.id}>
                    <SidebarMenuButton
                      onClick={() => handleModuleGroupClick(group.id)}
                      className="font-semibold hover:bg-gray-200 rounded px-3 py-2"
                    >
                      {group.title}
                    </SidebarMenuButton>

                    {activeModuleGroupId === group.id && (
                      <SidebarMenu>
                        {courses.modules
                          .filter((module) => module.groupId === group.id)
                          .map((module) => (
                            <SidebarMenuItem key={module.id}>
                              <SidebarMenuButton
                                onClick={() =>
                                  handleModuleClick(module.id, {
                                    title: module.title,
                                    description: module.description,
                                    videoUrl: module.videoUrl,
                                    transcript: module.transcript,
                                    materialLinks: module.materialLinks,
                                  })
                                }
                                className="hover:bg-gray-200 rounded px-3 py-2"
                              >
                                {module.title}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}

                        {courses.assignmentsQuizzes
                          .filter((assignment) =>
                            courses.modules.some(
                              (module) =>
                                module.id === assignment.moduleId &&
                                module.groupId === group.id
                            )
                          )
                          .map((assignment) => (
                            <SidebarMenuItem key={assignment.id}>
                              <SidebarMenuButton
                                className="flex justify-between items-center hover:bg-gray-200 rounded px-3 py-2"
                                onClick={() =>
                                  assignment.type === 'quiz'
                                    ? handleViewQuiz(assignment)
                                    : handleAssignmentClick(assignment)
                                }
                              >
                                {assignment.title}
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                      </SidebarMenu>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </ScrollArea>
    </Sidebar>
  );
}