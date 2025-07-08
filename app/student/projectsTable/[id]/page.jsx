"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

const ProjectReadme = () => {
  const { id } = useParams(); // Get project ID from the dynamic route
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await fetch(`/projects/${id}.md`);
        if (!res.ok) throw new Error("File not found");
        const text = await res.text();
        setContent(text);
      } catch (err) {
        setError("README file not found.");
      }
    };
    fetchMarkdown();
  }, [id]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6">{id} README</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeHighlight]}>{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
};

export default ProjectReadme;
