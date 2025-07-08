import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from '@/lib/redux/slices/authSlice'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function Navbar({ status }) {
  const router = useRouter();
  const dispatch = useDispatch();
	const { userType } = useSelector((state) => state.auth)

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      router.push("/auth/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  return (
    <div className="top-20 left-0 w-full py-4 z-50">
      <div className="container mx-auto flex justify-start items-center gap-4 px-6">
        {status === "succeeded" ? (
            <>
          
          <button
            onClick={handleLogout}
            className="btn bg-transparent text-[#ff6b6b] border-2 border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white capitalize rounded-full px-6 py-2 transition-all"
          >
            Logout
          </button>
          <Link
              href={userType+'/dashboard'}
              className="btn bg-transparent text-[#ff6b6b] border-2 border-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white capitalize rounded-full px-6 py-2 transition-all"
            >
              Go To Dashboard
            </Link>



          </>
        ) : (
          <>
            {/* Register Button */}
            <Link
              href="/auth/register"
              className="btn bg-transparent text-[#7270dd] border-2 border-[#7270dd] hover:bg-[#7270dd] hover:text-white capitalize rounded-full px-6 py-2 transition-all"
            >
              Register
            </Link>

            {/* Login Button */}
            <Link
              href="/auth/login"
              className="btn bg-transparent text-[#7270dd] border-2 border-[#7270dd] hover:bg-[#7270dd] hover:text-white capitalize rounded-full px-6 py-2 transition-all"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
