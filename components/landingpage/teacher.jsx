import React from "react";
import Image from "next/image";

export function Teacher(){
  return (
    <div className="container mx-auto py-20">
      <p className="text-3xl lg:text-5xl font-semibold text-gray-500 mt-3 text-center">
        Our Top Mentors
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 py-10 lg:py-20">
        {/* Mentor 1 */}
        <div className="flex flex-col gap-5 items-center">
          <Image
            src="/images/mentor11.png"
            alt="Christian Howard"
            width={350}
            height={300}
          
          />
          <p className="text-2xl font-semibold">Christian Howard</p>
          <p className="text-gray-500">Italian teacher</p>
        </div>

        {/* Mentor 2 */}
        <div className="flex flex-col gap-5 items-center">
          <Image
            src="/images/mentor2.png"
            alt="Sandra Wilson"
            width={350}
            height={300}
            
          />
          <p className="text-2xl font-semibold">Sandra Wilson</p>
          <p className="text-gray-500">Spanish teacher</p>
        </div>

        {/* Mentor 3 */}
        <div className="flex flex-col gap-5 items-center">
          <Image
            src="/images/mentor3.png"
            alt="Jimmy Cooper"
            width={350}
            height={300}
        
          />
          <p className="text-2xl font-semibold">Jimmy Cooper</p>
          <p className="text-gray-500">English teacher</p>
        </div>
      </div>
    </div>
  );
};

