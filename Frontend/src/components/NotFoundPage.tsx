import Image from "next/image";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#F7F8FA]">
      {/* Logo and Error Message */}
      <div className="flex flex-col items-center gap-8 mb-8">
        <Image 
          src="/vinuni_logo.png" 
          alt="Vinuni Logo" 
          width={100} 
          height={100} 
          className="opacity-50"
        />
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-300 select-none">404</h1>
          <p className="text-xl text-gray-500 mt-4 select-none">
            This page is under construction
          </p>
        </div>
      </div>

      {/* Return Button */}
      <Link 
        href="/dashboard" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg 
                 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 select-none"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage; 