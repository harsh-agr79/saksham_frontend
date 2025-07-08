import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);

  // Fetch playlists from an API
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/student/getytplaylists`, {
          method: "GET", // or "POST", "PUT", etc., depending on your API
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch playlists");
        }

        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, [token]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 text-black p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 text-black p-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black p-8">
      <h1 className="text-3xl font-bold mb-4">Playlist Collection</h1>

      <table className="table-auto w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-xl">Title</th>
            <th className="px-4 py-2 border-b text-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.id}>
              <td className="px-4 py-2 border-b">{playlist.title}</td>
              <td className="px-4 py-2 border-b">
                <Link href={`/student/splitWindow/${playlist.url}`}>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded">
                    Open in Split Window
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlaylistPage;