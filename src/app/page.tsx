import AuthForm from "@/components/AuthForm";



const Homepage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <AuthForm isSignup={false} />
      </div>
    </div>
  );
};

export default Homepage;