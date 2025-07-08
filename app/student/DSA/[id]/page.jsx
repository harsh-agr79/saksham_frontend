"use client";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SelectLanguages from "@/components/SelectLanguages";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Loader, Play, TriangleAlert } from "lucide-react";
import { codeSnippets, languageOptions } from "@/config/config";
import { HfInference } from "@huggingface/inference";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const client = new HfInference(`${process.env.NEXT_PUBLIC_HUGGING_FACE}`);

export default function ProblemEditorPage() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [sourceCode, setSourceCode] = useState(codeSnippets["javascript"]);
  const [languageOption, setLanguageOption] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [err, setErr] = useState(false);
  const editorRef = useRef(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`/leetcode/leetcode.json`);
        const data = await response.json();
        const selectedProblem = data.find((p) => p.id === id);
        setProblem(selectedProblem);
      } catch (error) {
        console.error("Failed to fetch problem data", error);
      }
    };

    fetchProblem();
  }, [id]);

  async function analyzeCode() {
    setLoading(true);
    setOutput("");

    const stream = client.chatCompletionStream({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content: `With less words and more data format directly.Check if the solution matched the following question if yes then Analyze the following code for the question \n${problem.title} \n${problem.problem_description}. Provide a short and precise analysis in a tabular or key-value format including time complexity and test case evaluations: \n\n${sourceCode}`,
        },
      ],
      provider: "together",
      max_tokens: 500,
    });

    for await (const chunk of stream) {
      if (chunk.choices && chunk.choices.length > 0) {
        const newContent = chunk.choices[0].delta.content;
        setOutput((prevOutput) => prevOutput + newContent);
      }
    }

    setLoading(false);
    toast.success("Analysis Completed");
  }

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="min-h-screen dark:bg-slate-900 rounded-2xl shadow-2xl py-6 px-8">
      <div className="flex flex-col pb-3">
        <h2 className="text-white text-2xl font-semibold">{problem.title}</h2>
        <div className="text-gray-400 text-sm mt-2 whitespace-pre-line">{problem.problem_description}</div>
      </div>

      <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded-2xl">
        <div className="flex justify-between pb-3">
          <SelectLanguages onSelect={setLanguageOption} selectedLanguageOption={languageOption} />
        </div>
        <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg border dark:bg-slate-900">
          <ResizablePanel defaultSize={50} minSize={35}>
            <Editor
              theme="vs-dark"
              height="100vh"
              defaultLanguage={languageOption.language}
              defaultValue={sourceCode}
              value={sourceCode}
              onChange={setSourceCode}
              language={languageOption.language}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={35}>
            <div className="space-y-3 bg-slate-300 dark:bg-slate-900 min-h-screen overflow-y-auto p-4 rounded-lg">
              <div className="flex items-center justify-between bg-slate-400 dark:bg-slate-950 px-6 py-2">
                <h2>Output</h2>
                {loading ? (
                  <Button disabled size={"sm"} className="dark:bg-purple-600 text-slate-100 bg-slate-800">
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    <span>Analyzing...</span>
                  </Button>
                ) : (
                  <Button onClick={analyzeCode} size={"sm"} className="dark:bg-purple-600 text-slate-100 bg-slate-800">
                    <Play className="w-4 h-4 mr-2" />
                    <span>Analyze</span>
                  </Button>
                )}
              </div>
              <div className="px-6 space-y-2 overflow-y-auto max-h-[80vh]">
                <pre className="text-sm text-white whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
