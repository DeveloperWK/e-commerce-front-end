import {
    BadgeHelp,
    Box,
    LogOut,
    MessageSquareMore,
    NotebookText,
    UserPen
} from "lucide-react";
import Link from "next/link";

const MobileUserAccount = () => {
  return (
    <section>
      <h1>Hello Welcome to Shopping App</h1>
      <section>
        Have an account ?<Link href="/sign-in">Sign In</Link>
      </section>
      <section>
        Don&apos;t have an account ?<Link href="/sign-up">Sign Up</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <UserPen size={20} />
        </span>
        <Link href="/sign-in">My profile</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <Box size={20} />
        </span>
        <Link href="/">My Order</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <NotebookText size={20} />
        </span>
        <Link href="/">Policies</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <LogOut size={20} />
        </span>
        <Link href="/">Logout</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <MessageSquareMore size={20} />
        </span>
        <Link href="/">Feedback</Link>
      </section>
      <section className="flex items-center gap-2">
        <span>
          <BadgeHelp size={20} />
        </span>
        <Link href="/">Help</Link>
      </section>
    </section>
  );
};

export default MobileUserAccount;
