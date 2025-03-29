import EmailSignupPopover from "@/app/components/EmailSignupPopover";
import Navbar from "@/app/components/NavBar";

function WithNavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <EmailSignupPopover />
    </>
  );
}
export default WithNavbarLayout;
