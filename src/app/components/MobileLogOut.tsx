"use client";
import { LogOut } from "lucide-react";
import { useAuth } from "@/app/hooks/useAuth";
const MobileLogOut = () => {
  const { isAuthenticated, signOut } = useAuth();
  return (
    <>
      {isAuthenticated && (
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <LogOut size={20} />
          </span>
          <button
            onClick={signOut}
            className="text-red-500 font-medium hover:underline"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};
export default MobileLogOut;
