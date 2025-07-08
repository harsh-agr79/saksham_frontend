import React, { useState } from 'react';

export function CommunityCards() {
  const communities = [
    {
      name: 'Web Development Community',
      mentor: 'Alice Johnson',
      description: 'A community focused on building modern web applications using the latest technologies.',
    },
    {
      name: 'Graphic Design Hub',
      mentor: 'Bob Smith',
      description: 'Join us to explore the world of graphic design, from basics to advanced techniques.',
    },
    {
      name: 'Digital Marketing Group',
      mentor: 'Carol Williams',
      description: 'Learn and share knowledge about SEO, content marketing, and social media strategies.',
    },
    {
      name: 'Animation Enthusiasts',
      mentor: 'David Brown',
      description: 'Dive into animation principles and create stunning animations with fellow enthusiasts.',
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Our Communities
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {communities.map((community, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-r from-[rgba(255,245,238,0.8)] via-[rgba(255,245,238,0.9)] to-[rgba(255,245,238,1)] rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <h3 className="text-lg font-semibold text-gray-700">{community.name}</h3>
            <p className="text-sm text-gray-600 mt-2">Mentor: {community.mentor}</p>
            {hoveredIndex === index && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-700 text-sm p-4 rounded-lg shadow-md border">
                {community.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
