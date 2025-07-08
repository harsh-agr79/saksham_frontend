"use client";

import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableRow, TableHeader, TableCell, TableBody } from '@/components/ui/table';

const projects = [
  "accessible-form-ui",
  "accordion",
  "age-calculator",
  "automated-backups",
  "basic-dns",
  "basic-dockerfile",
  "basic-html-website",
  "bastion-host",
  "blogging-platform-api",
  "blue-green-deployment",
  "broadcast-server",
  "caching-server",
  "changelog-component",
  "configuration-management",
  "cookie-consent",
  "custom-dropdown",
  "database-backup-utility",
  "datepicker-ui",
  "dockerized-service-deployment",
  "dummy-systemd-service",
  "ec2-instance",
  "ecommerce-api",
  "expense-tracker-api",
  "expense-tracker",
  "file-integrity-checker",
  "fitness-workout-tracker",
  "flash-cards",
  "github-actions-deployment-workflow",
  "github-random-repo",
  "github-user-activity",
  "iac-digitalocean",
  "image-grid",
  "image-processing-service",
  "log-archive-tool",
  "markdown-note-taking-app",
  "monitoring",
  "movie-reservation-system",
  "multi-container-service",
  "multiservice-docker",
  "nginx-log-analyser",
  "nodejs-service-deployment",
  "number-guessing-game",
  "personal-blog",
  "pomodoro-timer",
  "portfolio-website",
  "quiz-app",
  "realtime-leaderboard-system",
  "reddit-client",
  "restricted-textarea",
  "scalable-ecommerce-platform",
  "server-stats",
  "service-discovery",
  "simple-monitoring-dashboard",
  "simple-tabs",
  "single-page-cv",
  "ssh-remote-server-setup",
  "static-site-server",
  "stories-feature",
  "task-tracker-js",
  "task-tracker",
  "temperature-converter",
  "testimonial-cards",
  "tmdb-cli",
  "todo-list-api",
  "tooltip-ui",
  "unit-converter",
  "url-shortening-service",
  "weather-api-wrapper-service",
  "weather-app"
];

const ProjectsTablePage = () => {
  const router = useRouter(); // Use the new 'useRouter' from next/navigation

  const handleViewProject = (projectName) => {
    router.push(`/student/projectsTable/${projectName}`); // Navigate to the specific project readme page
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <Card className="w-full max-w-5xl p-6 bg-purple-100 shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6">Projects List</h1>
        <Table className="min-w-full bg-purple-100">
          <TableHeader>
            <TableRow>
              <TableCell className="font-bold">ID</TableCell>
              <TableCell className="font-bold">Project Name</TableCell>
              <TableCell className="font-bold">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{project}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleViewProject(project)}
                    className="bg-purple-500 text-white hover:bg-purple-600"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProjectsTablePage;
