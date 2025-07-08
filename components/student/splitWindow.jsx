'use client';

import { useParams } from 'next/navigation';
import Editor from '@monaco-editor/react';
import { useEffect } from 'react';
import { compileCode } from "@/actions/compile";
import SelectLanguages from "@/components/SelectLanguages";
import React, { useRef, useState } from "react";
import { Loader, Play, TriangleAlert } from "lucide-react";
import { codeSnippets, languageOptions } from "@/config/config";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SplitWindowPage = () => {
  const params = useParams();
  const Url = decodeURIComponent(params.id); // Decode URL in case it is encoded
  const videoUrl = `https://www.youtube.com/embed/videoseries?list=${Url}`;

  const [sourceCode, setSourceCode] = useState("");
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

  async function executeCode() {
    setLoading(true);

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
    <div className="min-h-screen bg-gray-900 h-[80vh] text-white p-3">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-screen">
        {/* Top-left: YouTube iframe */}
        <div className="col-span-1 row-span-1 ">
          <iframe
            src={videoUrl}
            className="w-full h-full rounded-lg shadow-lg"
            allowFullScreen
          />
        </div>

        {/* Top-right: Monaco Editor */}
        <div className="col-span-1 h-[90vh] row-span-1">
            <div className='flex w-full justify-between'>
          <button onClick={executeCode} className='bg-purple-600 hover:bg-purple-700 text-white p-2 m-1 rounded  shadow-lg cursor-pointer'>
            run
          </button>
          <div className="w-[230px] p-2 justify-between">
            <SelectLanguages onSelect={onSelect} selectedLanguageOption={languageOption} />
          </div>
          </div>
          <Editor
            width="100%"
            height="100%"
            theme="vs-dark"
            defaultLanguage={languageOption.language}
            defaultValue={sourceCode}
            onMount={handleEditorDidMount}
            value={sourceCode}
            onChange={handleOnchange}
            language={languageOption.language}
            options={{
              automaticLayout: true,
              fontSize: 16,
            }}
          />
        </div>

        {/* Bottom-left: Compiler output */}
        <div className="col-span-1 row-span-1 h-[45vh] bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Compiler Output</h2>
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

        {/* Bottom-right: Empty space */}
        {/* <div className="col-span-1 row-span-1 bg-gray-800 p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Future Content</h2>
          <p className="text-gray-400">This space is reserved for future use.</p>
        </div> */}
      </div>
    </div>
  );
};

export default SplitWindowPage;
