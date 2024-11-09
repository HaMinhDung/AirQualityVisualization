import Image from "next/image";

const UserCard = ({
  type,
  data_number,
  changes,
  unit = "kWh", // Default unit
}: {
  type: string;
  data_number: number;
  changes: number;
  unit?: string;
}) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      
      {/* Display data_number with unit */}
      <h1 className="text-2xl font-semibold my-4">
        {data_number.toLocaleString()} <span className="text-lg text-gray-500">{unit}</span>
      </h1>
      
      {/* Display changes with color based on positive or negative */}
      <h3
        className={`text-xs ${
          changes >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {changes >= 0 ? `+${changes}%` : `${changes}%`} from last month
      </h3>
      
      {/* Display type */}
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
