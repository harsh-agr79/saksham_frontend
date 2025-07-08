"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import ReactFlow, {
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import * as prod from "react/jsx-runtime"; // For React 17+ support
import dagre from "dagre";

// Dagre setup for vertical layout (top-to-bottom)
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// Apply Dagre layout for vertical expansion
const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: "TB", nodesep: 50, edgesep: 30 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.data?.style?.width || 200, height: node.data?.style?.height || 80 });
  });

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  return nodes.map((node) => {
    const dagreNode = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: dagreNode.x, y: dagreNode.y }, // Always maintain vertical structure
      dragHandle: false, // Locks movement
      draggable: false, // Disables node dragging
    };
  });
};

// Custom Node Component (Styled from JSON)
const CustomNode = ({ data }) => {
  // Hide nodes with labels "No Label" or "vertical node"
  if (!data.label || data.label.toLowerCase() === "no label" || data.label.toLowerCase() === "vertical node") {
    return null;
  }

  return (
    <div
      className="p-2 border rounded shadow text-center flex items-center justify-center"
      style={{
        width: data.style?.width ? `${data.style.width}px` : "200px",
        height: data.style?.height ? `${data.style.height}px` : "80px",
        fontSize: data.style?.fontSize ? `${data.style.fontSize}px` : "18px",
        backgroundColor: data.style?.backgroundColor || "#fff",
        borderColor: data.style?.borderColor || "#000",
        borderWidth: "2px",
        borderStyle: "solid",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = { custom: CustomNode };

// Rehype processor for rendering Markdown
const processor = unified()
  .use(remarkParse) // Parse Markdown
  .use(remarkRehype) // Transform Markdown to HTML
  .use(rehypeReact, { // Transform HTML to React components
    createElement: React.createElement,
    Fragment: React.Fragment,
    ...prod,
  });

export default function RoadmapGraph() {
  const { x } = useParams();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [contentFiles, setContentFiles] = useState([]);

  useEffect(() => {
    if (!x) return;

    const fetchData = async () => {
      try {
        const [graphData, indexData] = await Promise.all([
          fetch(`/roadmap/${x}/${x}.json`).then((res) => res.json()),
          fetch(`/roadmap/${x}/index.json`).then((res) => res.json()),
        ]);

        let rawNodes = graphData.nodes
          .filter((node) => node.data?.label && node.data.label.toLowerCase() !== "no label" && node.data.label.toLowerCase() !== "vertical node") // Filter out unwanted labels
          .map((node) => ({
            id: node.id,
            data: {
              label: node.data?.label || "No Label",
              style: node.data?.style || {}, // Ensures JSON styles apply
            },
            type: "custom",
          }));

        let rawEdges = graphData.edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          type: "bezier", // Uses curved edges
          markerEnd: { type: "arrow" },
        }));

        // Apply vertical Dagre layout
        const updatedNodes = getLayoutedElements(rawNodes, rawEdges);

        setNodes(updatedNodes);
        setEdges(rawEdges);
        setContentFiles(indexData);
      } catch (error) {
        console.error("Error loading graph data:", error);
      }
    };

    fetchData();
  }, [x]);

  const onNodeClick = useCallback(
    async (event, node) => {
      if (!x) return;

      try {
        const matchingFile = contentFiles.find((file) => file.endsWith(`@${node.id}.md`));

        if (!matchingFile) {
          setSelectedContent("No content available for this node.");
          return;
        }

        const markdownContent = await fetch(`/roadmap/${x}/content/${matchingFile}`).then((res) => res.text());
        setSelectedContent(markdownContent);
      } catch (error) {
        console.error("Error loading markdown content:", error);
        setSelectedContent("Error loading content.");
      }
    },
    [x, contentFiles]
  );

  // Render Markdown using Rehype
  const renderMarkdown = (markdown) => {
    try {
      const file = processor.processSync(markdown);
      return file.result;
    } catch (error) {
      console.error("Error rendering Markdown:", error);
      return <p>Error rendering content.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 border-r">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          nodesDraggable={false} // Locks the entire graph
          nodesConnectable={true} // Allows connections but no dragging
          zoomOnScroll={false} // Disables zooming
        >
          <Controls />
        </ReactFlow>
      </div>
      <div className="w-1/3 p-4 overflow-auto bg-gray-100">
        {selectedContent ? (
          renderMarkdown(selectedContent)
        ) : (
          <p className="text-gray-600">Click on a node to view content.</p>
        )}
      </div>
    </div>
  );
}