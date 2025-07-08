import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/landingpage/navbar.jsx";

export function Hero({status}){
  return (
    <div className="container mx-auto my-10">
      <div className="bg-purple-100 px-6 lg:px-16 py-10 rounded-3xl">
        {/* Navbar */}
        <Navbar status={status}/>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5">
          {/* Left Content */}
          <div className="flex flex-col gap-5 lg:gap-10 items-center lg:items-start text-center lg:text-left">
            <div className="size-500">
              <Image
                src="/images/saksham.png"
                alt="Saksham Logo"
                width={800}
                height={800}
                priority
              />
            </div>
            <p className="text-2xl sm:text-4xl md:text-6xl lg:text-6xl font-medium">
              Making you Capable <br className="lg:flex hidden" /> for tomorrow
            </p>
            <div className="mt-4">
              {/* <Link href="/components/auth/register" className="btn btn-sm lg:btn-lg bg-[#524fd5] text-white rounded-full border-none w-36 lg:w-44 capitalize">
                  Register Now!
              </Link> */}
            </div>
          </div>

          {/* Right Image */}
          <Image
            src="/images/code11.png"
            alt="Hero Image"
            width={600}
            height={600}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
