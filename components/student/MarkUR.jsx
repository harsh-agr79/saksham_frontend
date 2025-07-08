import React from 'react';

export function EventCards() {
  const events = [
    {
      title: 'Hackathon 2024',
      eventDate: 'March 15, 2024',
      registrationDeadline: 'March 1, 2024',
      description: 'Join us for a 48-hour coding marathon to innovate and create amazing projects.',
    },
    {
      title: 'AI & ML Contest',
      eventDate: 'April 10, 2024',
      registrationDeadline: 'March 25, 2024',
      description: 'Showcase your skills in artificial intelligence and machine learning.',
    },
    {
      title: 'Web Dev Challenge',
      eventDate: 'May 5, 2024',
      registrationDeadline: 'April 20, 2024',
      description: 'Compete to build the best web applications using modern technologies.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Upcoming Contests & Hackathons
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-[#FFF5EE] rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-700 mb-1">
              <strong>Event Date:</strong> {event.eventDate}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              <strong>Registration Deadline:</strong> {event.registrationDeadline}
            </p>
            <p className="text-sm text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
