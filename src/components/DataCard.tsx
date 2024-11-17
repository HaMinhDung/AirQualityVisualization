import Image from "next/image";

const DataCard = ({
  type,
  data_number,
  changes,
  unit = "",
}: {
  type: string;
  data_number: number;
  changes: number;
  unit?: string;
}) => {
  // Format number consistently
  const formattedNumber = data_number?.toLocaleString();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm">{type}</h3>
        <span className={`text-sm ${changes > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {changes > 0 ? '+' : ''}{changes}%
        </span>
      </div>
      <div className="mt-2 flex items-baseline">
        <h2 className="text-2xl font-semibold">
          {formattedNumber} {unit}
        </h2>
      </div>
    </div>
  );
};

export default DataCard;
