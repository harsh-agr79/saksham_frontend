import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function MyCardboardVR() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-[#FFF5EE] p-8 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105">
        <div className="mb-4">
          <Image
            src="/images/bgnoCard.png" // Ensure this path is correct
            alt="Cardboard VR Headset"
            width={400}
            height={350}
            className="mx-auto"
          />
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Are you ready to make your own VR?
        </h2>
        <Link href="/student/cardboardVR" passHref>
          <button className="bg-white text-black font-bold py-2 px-4 rounded-lg border shadow-md hover:bg-gray-200 transition duration-300">
            Explore Cardboard VR
          </button>
        </Link>
      </div>
    </div>
  );
}
