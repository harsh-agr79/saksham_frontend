import React, { useState } from 'react';

export function VocationalCourses() {
  const courses = [
    {
      name: 'Web Development',
      mentor: 'John Doe',
      description: 'Learn how to build stunning websites using HTML, CSS, and JavaScript.',
    },
    {
      name: 'Graphic Design',
      mentor: 'Jane Smith',
      description: 'Master the art of visual communication with tools like Photoshop and Illustrator.',
    },
    {
      name: 'Digital Marketing',
      mentor: 'Michael Brown',
      description: 'Explore the world of online marketing, SEO, and social media strategies.',
    },
    {
      name: 'Animation Basics',
      mentor: 'Emily Davis',
      description: 'Bring your ideas to life with 2D and 3D animation techniques.',
    },
  ];

  const [hoveredCourse, setHoveredCourse] = useState(null);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Vocational Courses
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {courses.map((course, index) => (
          <div
            key={index}
            className="group relative bg-[#FFF5EE] rounded-lg shadow-lg p-6 hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setHoveredCourse(index)}
            onMouseLeave={() => setHoveredCourse(null)}
          >
            <h3 className="text-lg font-semibold text-gray-700">{course.name}</h3>
            <p className="text-sm text-gray-600 mt-2">Mentor: {course.mentor}</p>
            {hoveredCourse === index && (
              <div className="absolute -top-20 left-0 right-0 bg-white text-gray-700 text-sm p-4 rounded-lg shadow-md border">
                {course.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
