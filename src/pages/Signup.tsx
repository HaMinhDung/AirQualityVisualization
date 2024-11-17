import AuthForm from "@/components/AuthForm";
export default function SignupPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md">
          <AuthForm isSignup={true} />
        </div>
      </div>
    );
  }