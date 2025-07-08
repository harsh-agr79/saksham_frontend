'use client';

import { useState, useRef } from "react";
import Draggable from "react-draggable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function SpotifyPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const nodeRef = useRef(null); // Fix for React 18

  return (
    <div>
      {/* Draggable Floating Player */}
      {isOpen && (
        <Draggable nodeRef={nodeRef}>
          <div ref={nodeRef} className="fixed bottom-20 right-4 cursor-move">
            <Card className="w-[400px] h-[180px] bg-black text-white p-3 rounded-2xl shadow-lg">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              {/* Spotify Embed */}
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/playlist/0xNfHSa7OY90zTycOOYOJw"
                width="100%"
                height="200"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Card>
          </div>
        </Draggable>
      )}

      {/* Open Music Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg cursor-pointer"
          >
            🎵 Open Music
          </Button>
        </div>
      )}
    </div>
  );
}
