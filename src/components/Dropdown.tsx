import React from "react";

const Dropdown = ({ options, onSelect }: { options: string[]; onSelect: (value: string) => void }) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="border rounded px-2 py-1"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
