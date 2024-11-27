import Image from "next/image";

const DataCard = ({
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
    <div className="rounded-2xl bg-white p-3 flex-1 min-w-[120px] m-2 h-[120px]"> {/* Adjusted size */}
      <div className="flex justify-between items-center">
        <span className="text-[8px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={18} height={18} />
      </div>
      
      {/* Display data_number with unit */}
      <h1 className="text-xl font-semibold my-3">
        {data_number.toLocaleString()} <span className="text-md text-gray-500">{unit}</span>
      </h1>
      
      {/* Display changes with color based on positive or negative */}
      <h3
        className={`text-xs ${changes >= 0 ? "text-green-600" : "text-red-600"}`}
      >
        {changes >= 0 ? `+${changes}%` : `${changes}%`} from last month
      </h3>
      
      {/* Display type */}
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default DataCard;
