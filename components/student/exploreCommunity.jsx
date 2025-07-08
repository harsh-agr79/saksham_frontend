import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

const ExploreCommunity = () => {
  const router = useRouter();
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (!isAuthenticated) {
    //   router.replace("/");
    //   return;
    // }

    const fetchCommunities = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/explorecommunity/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "", // Ensure API key is not null
            Authorization: `Bearer ${token}`, // Ensure token is not null
          },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to load communities.");
        }
        const data = await res.json();
        console.log(data)
        setCommunities(data); // Assuming the API returns an array of communities
      } catch (err) {
        console.error("[FETCH_COMMUNITIES_ERROR]", err);
        setError(err.message || "An error occurred while fetching communities.");
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, [isAuthenticated, token, router]);

  const handleExplore = (id) => {
    router.push(`/${userType}/community/${id}`);
  };

  if (!isAuthenticated) {
    return null; // Prevent rendering if redirecting
  }

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Explore Communities</h1>
        <p className="text-lg text-gray-600 mt-2">
          Discover and join communities from diverse domains to learn, share, and grow.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading communities...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card
              key={community.id}
              className="bg-purple-100 relative w-full h-72 overflow-hidden rounded-lg shadow-lg"
            >
              {/* Cover Image */}
              <div className="bg-purple-100 absolute inset-0">
                <img
                  src={process.env.NEXT_PUBLIC_IMAGE_URL+community.cover_photo} // Fallback to default image
                  alt={`${community.name} Cover`}
                  className="  object-cover w-full h-full"
                />
              </div>

              {/* Avatar and Title */}
              <CardContent className="relative flex flex-col justify-end items-start h-full p-4 space-y-2 bg-purple-100">
                <div className="absolute top-4 left-4">
                  <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                    <AvatarImage src={process.env.NEXT_PUBLIC_IMAGE_URL+community.profile_photo} alt={community.title} />
                    <AvatarFallback>{community.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                
              </CardContent>

              {/* Bottom Action */}
              <div className="absolute bottom-0 w-full bg-white p-4 flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600">
                  <strong>{community.name}</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Created by:</strong> {community.creator_name}
                  </div>
                </div>
                
                <Button
                  className="text-sm"
                  onClick={() => handleExplore(community.id)}
                >
                  Explore
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreCommunity;
