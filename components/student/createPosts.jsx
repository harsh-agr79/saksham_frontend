"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";

export function CreatePost({ onPost, domain }) {
  const [caption, setCaption] = useState(""); // For text content
  const [image, setImage] = useState(null); // For image upload
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent duplicate submissions
  const { toast } = useToast();
  const { id } = useParams(); // Dynamically get community ID
  const { userType, token } = useSelector((state) => state.auth); // Get user type and token from Redux

  const handleSubmit = async () => {
    if (!caption && !image) {
      toast({
        title: "Content required",
        description: "Add text or an image to post.",
      });
      return;
    }

    setIsSubmitting(true);

    // Prepare the form data
    const formData = new FormData();
    formData.append("caption", caption);
    if (image) {
      formData.append("content", image);
    }

    try {
      // Make the POST request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/post`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to create post.");

      const newPost = await response.json();

      toast({
        title: "Post created",
        description: "Your post has been successfully created.",
      });

      onPost(newPost.post); // Notify parent about the new post

      // Clear inputs
      setCaption("");
      setImage(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "There was an error creating your post. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow ">
      <h2 className="text-lg font-semibold mb-2">Create a Post</h2>

      {/* Caption Input */}
      <Textarea
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="mb-2"
      />

      {/* Image Upload */}
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="mb-2"
      />

      <Button
        onClick={handleSubmit}
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Posting..." : "Post"}
      </Button>
    </div>
  );
}
