'use client';

import { useState } from "react";
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
import { useSelector } from "react-redux";

export function EditAssignmentDialog({ assignment, onSave }) {
  const { userType, token } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: assignment.type,
    title: assignment.title,
    description: assignment.description,
    dueDate: assignment.dueDate,
    questions: [...assignment.content.questions],
  });

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

  const handleQuestionChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, question: value } : q
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
              options: q.options?.map((o, j) => (j === optIndex ? value : o)),
            }
          : q
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

  const addOption = (qIndex) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex ? { ...q, options: [...(q.options || []), ""] } : q
      ),
    }));
  };

  const removeOption = (qIndex, optIndex) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options?.filter((_, j) => j !== optIndex) }
          : q
      ),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");

    const updatedAssignment = {
      id: assignment.id,
      module_id: assignment.moduleId,
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

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/course/assignment-quizzes/${assignment.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify(updatedAssignment),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update assignment.");
      }

      const result = await response.json();
      console.log("Updated Assignment:", result);

      window.location.reload();
      setOpen(false);
    } catch (err) {
      console.error("[EDIT_ASSIGNMENT_ERROR]", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFF5EE]">
      <Button onClick={() => setOpen(true)}>Edit Assignment</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Assignment Type */}
            <div className="flex flex-col space-y-1.5">
              <Label>Assignment Type</Label>
              <Select
                onValueChange={(value) => handleTypeChange(value)}
                value={formData.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="flex flex-col space-y-1.5">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            {/* Description */}
            <div className="flex flex-col space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Due Date */}
            <div className="flex flex-col space-y-1.5">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>

            {/* Questions */}
            <div>
              <Label>Questions</Label>
              {formData.questions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4 border-b pb-4 mb-4">
                  <Input
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    placeholder={`Question ${qIndex + 1}`}
                  />
                  {formData.type === "quiz" && (
                    <>
                      <Label>Options</Label>
                      {q.options?.map((opt, optIndex) => (
                        <div
                          key={optIndex}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(qIndex, optIndex, e.target.value)
                            }
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(qIndex, optIndex)}
                          >
                            Remove Option
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(qIndex)}
                      >
                        Add Option
                      </Button>
                      <div className="mt-4">
                        <Label>Answer</Label>
                        <Input
                          value={q.answer || ""}
                          onChange={(e) =>
                            handleAnswerChange(qIndex, e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 mt-2"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    Remove Question
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addQuestion}>
                Add Question
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
