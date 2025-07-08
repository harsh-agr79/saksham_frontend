'use client';

import { useState } from "react";

import PostList from "@/components/student/postList.jsx";
import { dummyPosts } from "@/components/student/postData"; // Replace with your path for dummy data
import { CommunityDomain } from "@/components/student/communityDomain";
import { CommunitySideCard } from "@/components/student/communitySideCard";
import { Button } from "@/components/ui/button"

export default function Feed() {
  const [posts, setPosts] = useState(dummyPosts);

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleRepost = (post) => {
    const repost = {
      ...post,
      id: crypto.randomUUID(),
      repostedFrom: post.id,
      createdAt: new Date(),
    };
    setPosts([repost, ...posts]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      {/* <div className="text-center mb-6">
        <div className="text-4xl font-bold">Learn In Public!</div>
        <div className="text-2xl text-gray-600">Share your journey, grow together</div>
      </div> */}

      {/* Community Domain */}
      <CommunityDomain />

      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row lg:space-x-6 mt-6">
        

        {/* Right: Community Side Card */}
        <div className="lg:w-1/3">
          <CommunitySideCard />
        </div>
        {/* Left: Create Post and Post List */}
        <div className="flex-1 space-y-6">
         
          <PostList posts={posts} onRepost={handleRepost} />
        </div>
      </div>
    </div>
  );
}        