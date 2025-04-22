"use client";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";
const MobileAccount = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated && (
        <section className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <span className="text-gray-700">Have an account ?</span>
            <Link
              href="/sign-in"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign In
            </Link>
          </div>
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <span className="text-gray-700">Don&apos;t have an account?</span>
            <Link
              href="/sign-up"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </section>
      )}
    </>
  );
};
export default MobileAccount;
