import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white">
      {/* Logo and Title Section */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <Image 
          src="/vinuni_logo.png" 
          alt="Vinuni Logo" 
          width={120} 
          height={120} 
          className="mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 text-center select-none">
          Air Quality Visualization System
        </h1>
        <p className="text-gray-600 text-lg text-center max-w-md select-none">
          Monitor and analyze air quality metrics in real-time
        </p>
      </div>

      {/* Button Section */}
      <Link 
        href="/dashboard" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg 
                 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 select-none"
      >
        Enter Dashboard
      </Link>
    </div>
  );
};

export default Homepage;