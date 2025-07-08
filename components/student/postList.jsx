"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import { CreatePost } from "@/components/student/createPosts.jsx";

const PostList = ({ onRepost }) => {
  const { id } = useParams(); // Community ID
  const [domain, setDomain] = useState("");
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(".");
  const { userType, token } = useSelector((state) => state.auth);
  const [nextPageUrl, setNextPageUrl] = useState(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/posts`); // Track next page URL

  const handlePost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  useEffect(() => {
    const fetchCommunityData = async () => {
      if (!id) {
        setError("Community ID is missing.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}`, // Dynamic endpoint
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include Bearer token
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch community data.");
        }

        const data = await response.json();
        console.log(data.domains)
        setDomain(data.domains);
      } catch (err) {
        console.error("[FETCH_COMMUNITY_ERROR]", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [id, userType, token]);

  // Fetch posts (initial or pagination)
  const fetchPosts = useCallback(async (url = null) => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true);
    setError("");

    try {
      const apiUrl =
        url ||
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/posts`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts.");
      }

      const data = await response.json();
      setPosts((prev) => [...prev, ...data.data]); // Append new posts
      setNextPageUrl(data.next_page_url); // Update next page URL
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [loading, userType, token, id]);

  // Infinite scrolling logic
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if(nextPageUrl != null){
          fetchPosts(nextPageUrl);
        }
        
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPageUrl, fetchPosts]);

  return (<>
    {!error && <CreatePost onPost={handlePost} domain={domain}/>}
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onRepost={onRepost} />
      ))}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!nextPageUrl && !loading && <p className="text-center">No more posts to load.</p>}
    </div>
    </>
  );
};

const PostItem = ({ post, onRepost }) => {
  const { id } = useParams(); // Community ID
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.is_liked_by_user);
  const [likeCount, setLikeCount] = useState(post.like_count);
  const { userType, token } = useSelector((state) => state.auth);

  // Process comments into a nested structure
  useEffect(() => {
    const buildNestedComments = (comments) => {
      const commentMap = {};
      const nestedComments = [];

      // Create a map of comments by ID
      comments.forEach((comment) => {
        commentMap[comment.id] = { ...comment, replies: [] };
      });

      // Populate replies and top-level comments
      comments.forEach((comment) => {
        if (comment.parent_comment_id === null) {
          nestedComments.push(commentMap[comment.id]);
        } else if (commentMap[comment.parent_comment_id]) {
          commentMap[comment.parent_comment_id].replies.push(commentMap[comment.id]);
        }
      });

      return nestedComments;
    };

    setComments(buildNestedComments(post.comments || []));
  }, [post.comments]);

  const handleToggleLike = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/post/${post.id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to toggle like.");

      const data = await response.json();
      setIsLiked(data.is_liked_by_user);
      setLikeCount(data.like_count);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleComment = async (content, parentCommentId = null) => {
    if (!content.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/community/${id}/post/${post.id}/comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
          body: JSON.stringify({ content, parent_comment_id: parentCommentId }),
        }
      );

      if (!response.ok) throw new Error("Failed to post comment.");

      const data = await response.json();
      const newComment = {
        id: data.comment.id,
        username: data.comment.username,
        content: data.comment.content,
        parent_comment_id: data.comment.parent_comment_id,
        created_at: data.comment.created_at,
        replies: [],
      };

      setComments((prevComments) => {
        if (parentCommentId === null) {
          return [...prevComments, newComment]; // Top-level comment
        } else {
          const addReplyToParent = (comments) =>
            comments.map((comment) => {
              if (comment.id === parentCommentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), newComment],
                };
              } else if (comment.replies) {
                return { ...comment, replies: addReplyToParent(comment.replies) };
              }
              return comment;
            });
          return addReplyToParent(prevComments);
        }
      });

      setCommentContent("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="p-4 bg-purple-100 rounded-lg shadow">
      <div>
        <p className="font-semibold text-lg">{post.username || "Anonymous"}</p>
        <p className="mt-2">{post.caption}</p>
        {post.content && (
            <div className="flex bg-slate-200 justify-center items-center my-4">
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${post.content}`}
                alt={post.caption}
              />
            </div>
          )}
        <div className="flex space-x-2 mt-2">
          <Button variant={isLiked ? "solid" : "outline"} size="sm" onClick={handleToggleLike}>
            👍 {isLiked ? "Unlike" : "Like"} ({likeCount})
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowComments((prev) => !prev)}>
            💬 Comment
          </Button>
        </div>
      </div>

      {showComments && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold">Comments</h3>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={(replyContent, parentCommentId) =>
                handleComment(replyContent, parentCommentId)
              }
            />
          ))}
          <div className="mt-2">
            <Textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button className="mt-2 w-full" onClick={() => handleComment(commentContent)}>
              Post Comment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const CommentItem = ({ comment, onReply }) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (!replyContent.trim()) {
      alert("Reply cannot be empty.");
      return;
    }

    onReply(replyContent, comment.id);
    setReplyContent("");
    setIsReplyOpen(false);
  };

  return (
    <div className="pl-4 border-l mt-2">
      <p className="font-semibold">{comment.username || "Anonymous"}</p>
      <p>{comment.content}</p>
      <div className="flex space-x-2 mt-2">
        <Button size="sm" onClick={() => setIsReplyOpen(true)}>
          💬 Reply
        </Button>
      </div>

      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
      ))}

      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent>
          <DialogHeader>
            <h3 className="text-lg font-semibold">Reply to Comment</h3>
          </DialogHeader>
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReplyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleReply}>Post Reply</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostList;
