import Image from "next/image";
import Link from "next/link";

const Homepage = () => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/vinuni_background.jpg"
          alt="VinUni Background"
          fill
          className="object-cover blur-sm brightness-90"
          priority
        />
        {/* Gradient overlay for better readability - lighter around center */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-6 mb-12 z-10 bg-black/10 p-8 rounded-2xl backdrop-blur-sm">
        <div className="bg-white/95 rounded-full p-4">
          <Image 
            src="/vinuni_logo.png" 
            alt="Vinuni Logo" 
            width={120} 
            height={120} 
            className="mb-4"
          />
        </div>
        <h1 className="text-4xl font-bold text-white text-center select-none drop-shadow-lg">
          Air Quality Visualization System
        </h1>
        <p className="text-gray-100 text-lg text-center max-w-md select-none drop-shadow-md">
          Monitor and analyze air quality metrics in real-time
        </p>
      </div>

      {/* Button Section */}
      <Link 
        href="/dashboard" 
        className="bg-blue-600/90 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg 
                 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 select-none
                 z-10 backdrop-blur-sm border border-white/20"
      >
        Enter Dashboard
      </Link>
    </div>
  );
};

export default Homepage;