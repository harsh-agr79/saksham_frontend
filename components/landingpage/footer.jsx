import React from "react";
import Image from "next/image";
// import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

export function Footer(){
  return (
    <div className="w-full bg-white py-10 text-black">
      <div className="container mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="w-1/3">
          <Image
            src="/images/saksham.png"
            alt="saksham logo"
            width={150}
            height={150}
            className="mx-auto"
          />
        </div>
        {/* Social Media Icons
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <BsFacebook className="text-2xl hover:text-blue-500" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <BsInstagram className="text-2xl hover:text-pink-500" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <BsTwitter className="text-2xl hover:text-blue-400" />
          </a>
        </div> */}
        {/* Footer Text */}
        <p className="text-center text-sm text-gray-400">
          &copy; 2024 Saksham. All rights reserved.
        </p>
      </div>
    </div>
  );
};


