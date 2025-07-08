'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CourseDescription } from '@/components/student/courseDescription.jsx';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = parseInt(params.id, 10); // Convert id to a number
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Extracting authentication state
  const { isAuthenticated, userType, token } = useSelector((state) => state.auth);

  const fetchCourseDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${userType}/courses/details/${courseId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY, // API key from environment variables
            Authorization: `Bearer ${token}`, // Bearer token from Redux store
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setCourse(data); // Assuming the API returns the course object
        setMessage('');
      } else {
        setMessage(data.message || 'Failed to fetch course details.');
        setCourse(null);
      }
    } catch (error) {
      console.error('[FETCH_COURSE_DETAILS]', error);
      setMessage('An error occurred while fetching course details.');
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      router.replace('/');
      return;
    }

    if (courseId) {
      fetchCourseDetails();
    }
  }, [isAuthenticated, userType, token, courseId, router]);

  if (!isAuthenticated || userType !== 'student') {
    return null; // Prevent rendering if redirecting
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-10">
        <h1 className="text-xl font-semibold">Course Not Found</h1>
        <p>{message || "We couldn't find the course you're looking for."}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <CourseDescription course={course} />
    </div>
  );
}
