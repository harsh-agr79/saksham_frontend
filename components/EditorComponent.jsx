"use client";
import React, { useRef, useState } from "react";
import SelectLanguages from "./SelectLanguages";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Loader, Play, TriangleAlert } from "lucide-react";
import { codeSnippets, languageOptions } from "@/config/config";
import { compileCode } from "@/actions/compile";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function EditorComponent() {
  const [sourceCode, setSourceCode] = useState(codeSnippets["javascript"]);
  const [languageOption, setLanguageOption] = useState(languageOptions[0]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState([]);
  const [err, setErr] = useState(false);
  const editorRef = useRef(null);
  const { userType, token } = useSelector((state) => state.auth);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }

  function handleOnchange(value) {
    if (value) {
      setSourceCode(value);
    }
  }

  function onSelect(value) {
    setLanguageOption(value);
    setSourceCode(codeSnippets[value.language]);
  }

  async function contribute() {
    setLoading(true);
    try {
      

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/contribute`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Contribution failed");
      }

      toast.success("Contribution successful");
    } catch (error) {
      toast.error(error.message || "Failed to contribute");
    }
  }

  async function executeCode() {
    setLoading(true);

    await contribute(); // Call contribute function before execution

    const requestData = {
      language: languageOption.language,
      version: languageOption.version,
      files: [{ content: sourceCode }],
    };

    try {
      const result = await compileCode(requestData);
      setOutput(result.run.output.split("\n"));
      setErr(false);
      toast.success("Compiled Successfully");
    } catch (error) {
      setErr(true);
      toast.error("Failed to compile the Code");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 rounded-2xl shadow-2xl py-6 px-8">
      <div className="flex items-center justify-between pb-3">
        <h2 className="scroll-m-20 text-white text-2xl font-semibold tracking-tight">
          Saksham
        </h2>
        <div className="flex items-center space-x-2">
          <div className="w-[230px]">
            <SelectLanguages onSelect={onSelect} selectedLanguageOption={languageOption} />
          </div>
        </div>
      </div>

      <div className="bg-slate-400 dark:bg-slate-950 p-3 rounded-2xl">
        <ResizablePanelGroup direction="horizontal" className="w-full rounded-lg border dark:bg-slate-900">
          <ResizablePanel defaultSize={50} minSize={35}>
            <Editor
              theme="vs-dark"
              height="100vh"
              defaultLanguage={languageOption.language}
              defaultValue={sourceCode}
              onMount={handleEditorDidMount}
              value={sourceCode}
              onChange={handleOnchange}
              language={languageOption.language}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={35}>
            <div className="space-y-3 bg-slate-300 dark:bg-slate-900 min-h-screen">
              <div className="flex items-center justify-between bg-slate-400 dark:bg-slate-950 px-6 py-2">
                <h2>Output</h2>
                {loading ? (
                  <Button disabled size={"sm"} className="dark:bg-purple-600 text-slate-100 bg-slate-800">
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    <span>Running...</span>
                  </Button>
                ) : (
                  <Button onClick={executeCode} size={"sm"} className="dark:bg-purple-600 text-slate-100 bg-slate-800">
                    <Play className="w-4 h-4 mr-2" />
                    <span>Run</span>
                  </Button>
                )}
              </div>
              <div className="px-6 space-y-2">
                {err ? (
                  <div className="flex items-center space-x-2 text-red-500 border border-red-600 px-6 py-6">
                    <TriangleAlert className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-xs">Failed to Compile the Code, Please try again!</p>
                  </div>
                ) : (
                  output.map((item, index) => (
                    <p className="text-sm text-white" key={index}>
                      {item}
                    </p>
                  ))
                )}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}