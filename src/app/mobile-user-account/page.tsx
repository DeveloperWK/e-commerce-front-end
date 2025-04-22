import {
  BadgeHelp,
  Box,
  MessageSquareMore,
  NotebookText,
  UserPen,
} from "lucide-react";
import Link from "next/link";
import MobileLogOut from "@/app/components/MobileLogOut";
import MobileAccount from "@/app/components/MobileAccount";

const MobileUserAccount = () => {
  return (
    <section className="p-4 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, Welcome to Shopping App
        </h1>
      </header>
      {/* Account Actions */}
      <MobileAccount />
      {/* Navigation Links */}
      <section className="mt-6 space-y-2">
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <UserPen size={20} />
          </span>
          <Link
            href="/sign-in"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            My Profile
          </Link>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <Box size={20} />
          </span>
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            My Orders
          </Link>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <NotebookText size={20} />
          </span>
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Policies
          </Link>
        </div>
        <MobileLogOut />
        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <MessageSquareMore size={20} />
          </span>
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Feedback
          </Link>
        </div>

        <div className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-gray-500">
            <BadgeHelp size={20} />
          </span>
          <Link
            href="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Help
          </Link>
        </div>
      </section>
    </section>
  );
};

export default MobileUserAccount;
