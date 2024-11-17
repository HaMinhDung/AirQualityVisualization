import Image from "next/image";

const ProfilePage = () => {
  // Placeholder data for user profile
  const user = {
    name: "We Ain't Byte",
    email: "WeAintByte@gmail.com",
    bio: "We're cooked",
    profilePicture: "/avatar.png",
    location: "Hanoi, VN",
    joinedDate: "January 2022",
    role: "Admin", // Added user role
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <div className="bg-white shadow-md rounded-lg w-[28rem] p-10 flex flex-col items-center">
        {/* Profile Picture */}
        <Image
          src={user.profilePicture}
          alt="Profile Picture"
          width={100} // Increased image size for better visual balance
          height={100}
          className="rounded-full mb-6"
        />

        {/* User Info */}
        <h1 className="text-3xl font-semibold mb-2">{user.name}</h1>
        <p className="text-blue-500 text-sm mb-4 font-medium">{user.role}</p> {/* Role display */}
        <p className="text-gray-500 mb-2">{user.location}</p>
        
        <p className="text-gray-700 text-center mb-4">{user.bio}</p>
        
        <div className="text-sm text-gray-500 mb-2">
          <span className="font-semibold">Joined:</span> {user.joinedDate}
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        {/* Edit Profile Button */}
        <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
