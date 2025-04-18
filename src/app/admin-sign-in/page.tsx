import SignInForm from "@/app/components/SignInForm";

const AdminSignIn = () => {
  return (
    <SignInForm heading="Admin Sign-In" successLink="/admin/create-products" />
  );
};
export default AdminSignIn;
