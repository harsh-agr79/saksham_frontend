import React from "react";
import Image from "next/image";

export function Student(){
  return (
    <div className="pl-20 pr-20 container mx-auto">
        
      <p className="text-gray-800 text-3xl lg:text-5xl font-medium capitalize">
        Our students say
      </p>
      <div className=" flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 py-10 lg:py-20">
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/student1.png"
            alt="Student Testimonial"
            id="st1"
            width={350}
            height={350}
            className="rounded-lg"
            priority
          />
        </div>
        <div className="flex flex-col gap-2 items-start lg:w-1/2">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Aditya Singh
          </p>
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl text-justify leading-relaxed">
            "Using the vocational training app has
            been an amazing experience! I never
            thought I’d learn so much about coding
            and entrepreneurship while still in school.
            The lessons are interactive and easy
            to follow, and I love how they connect
            to real-world careers. The VR simulations
            make it feel like I’m already working
            in the field, which has boosted my confidence.
            Thanks to this app, I’ve discovered my
            passion for graphic design and even earned
            a certificate that I can use to start
            building my future career. It’s truly
            been life-changing!"
          </p>
        </div>
      </div>
    </div>
  );
};


