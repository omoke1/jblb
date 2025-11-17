import { useState } from "react";
import { Icon } from "@iconify/react";

type DropdownProps = {
  options: string[];
};
export const Dropdown = ({ options }: DropdownProps) => {
    
    const [selected, setSelected] = useState(options[0]);
  const [open, setOpen] = useState(false);
   return (
    <div className="relative inline-block text-left">
        <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
            {selected}
            <div>
                {!open ? (
                <Icon icon="material-symbols:arrow-drop-down" width={20} className="inline" />
                ) : (
                <Icon icon="material-symbols:arrow-drop-up" width={20} className="inline" />
                )}
            </div>
        </button>

        {open && (
            <div className="absolute z-10 left-0 mt-2 w-40 rounded-md bg-white shadow-lg ring-1 ring-bgColor ring-opacity-5">
            <ul className="py-1 text-sm text-bodyText">
                {options.map((option) => (
                <li
                    key={option}
                    onClick={() => {
                    setSelected(option);
                    setOpen(false);
                    }}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                    {option}
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
  );
}
