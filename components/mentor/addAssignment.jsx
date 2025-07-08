"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function AddAssignment({ modules, onAssignmentAdded }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    moduleId: "",
    type: "quiz", // Default to quiz
    title: "",
    description: "",
    dueDate: "",
    questions: [],
  });
  const { userType, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTypeChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type: value,
      questions:
        value === "quiz"
          ? [{ question: "", options: ["", ""], answer: "" }]
          : [{ question: "", type: "file", id: 1 }],
    }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        formData.type === "quiz"
          ? { question: "", options: ["", ""], answer: "" }
          : { question: "", type: "file", id: prev.questions.length + 1 },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, question: value } : q
      ),
    }));
  };

  const handleAnswerChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, answer: value } : q
      ),
    }));
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((o, j) => (j === optIndex ? value : o)),
            }
          : q
      ),
    }));
  };

  const addOption = (qIndex) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex ? { ...q, options: [...q.options, ""] } : q
      ),
    }));
  };

  const removeOption = (qIndex, optIndex) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.filter((_, j) => j !== optIndex) }
          : q
      ),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.moduleId || !formData.title || !formData.dueDate) {
      setError("Please fill all required fields.");
      return;
    }

    const postData = {
      module_id: formData.moduleId,
      type: formData.type,
      title: formData.title,
      description: formData.description,
      due_date: formData.dueDate,
      content: {
        questions: formData.questions.map((q) => ({
          question: q.question,
          ...(formData.type === "quiz" && { options: q.options }),
          ...(formData.type === "quiz" && { answer: q.answer }),
          ...(formData.type === "assignment" && { type: "file", id: q.id }),
        })),
      },
    };
    console.log(postData)
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/assignment-quizzes/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add assignment.");
      }

      onAssignmentAdded();
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error("[ADD_ASSIGNMENT_ERROR]", error);
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      moduleId: "",
      type: "quiz",
      title: "",
      description: "",
      dueDate: "",
      questions: [
        { question: "", options: ["", ""], answer: "", type: "file", id: 1 },
      ],
    });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Assignment</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-purple-100">
          <DialogHeader>
            <DialogTitle>Add New Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col space-y-1.5">
              <Label>Module</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, moduleId: value })
                }
                value={formData.moduleId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id}>
                      {module.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label>Assignment Type</Label>
              <Select
                onValueChange={handleTypeChange}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            <div>
              <Label>Questions</Label>
              {formData.questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4 border-b pb-4 mb-4">
                  <Input
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, e.target.value)
                    }
                    placeholder={`Question ${qIndex + 1}`}
                  />
                  {formData.type === "quiz" && (
                    <>
                      <Label>Options</Label>
                      {q.options.map((opt, optIndex) => (
                        <div key={optIndex} className="flex items-center space-x-2">
                          <Input
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(qIndex, optIndex, e.target.value)
                            }
                          />
                          <Button
                            className = "bg-purple-500"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(qIndex, optIndex)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button
                        className = "bg-purple-500"
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(qIndex)}
                      >
                        Add Option
                      </Button>
                      <div className="mt-4">
                        <Label htmlFor={`answer-${qIndex}`}>Answer</Label>
                        <Input
                          id={`answer-${qIndex}`}
                          value={q.answer}
                          onChange={(e) =>
                            handleAnswerChange(qIndex, e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}
                  <Button
                  className = "bg-purple-500 mt-4 text-white"
                    variant="outline"
                    size="sm"
                    onClick={() => removeQuestion(qIndex)}
                
                  >
                    Remove Question
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addQuestion} className = "bg-purple-500">
                Add Question
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={resetForm} className = "bg-purple-500">
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Saving..." : "Save Assignment"}
            </Button>
          </DialogFooter>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
