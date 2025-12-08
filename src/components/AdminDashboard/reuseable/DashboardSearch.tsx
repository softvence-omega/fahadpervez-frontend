import { FC, useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

interface DashboardSearchProps {
  className?: string;
  value?: string; // optional controlled value
  onChange?: (value: string) => void; // callback when input changes
  debounce?: number; // optional debounce in ms
}

const DashboardSearch: FC<DashboardSearchProps> = ({
  className,
  value: controlledValue,
  onChange,
  debounce = 500,
}) => {
  const [value, setValue] = useState(controlledValue || "");

  // Handle controlled value updates
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!onChange) return;
    const handler = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(handler);
  }, [value, debounce, onChange]);

  return (
    <div
      className={`${className} flex items-center w-full gap-1 border border-border rounded-full bg-white px-3`}
    >
      <span className="text-xl flex items-center justify-center text-[#94A3B8] rounded-full transition-colors duration-200">
        <IoSearchSharp />
      </span>
      <input
        type="text"
        placeholder="Type here..."
        className=" w-ful outline-none bg-transparent text-[#AEAEB2] py-2   "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default DashboardSearch;
