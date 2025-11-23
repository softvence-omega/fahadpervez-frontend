import CommonHeader from "@/common/header/CommonHeader";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const Examiner = () => {
  const [taskName, setTaskName] = useState<string>("Introduction & Consent");
  const [checklistItems, setChecklistItems] = useState<string[]>([
    "Introduce yourself to patient",
    "Obtain informed consent",
  ]);

  const addChecklistItem = (): void => {
    setChecklistItems([...checklistItems, ""]);
  };

  const removeChecklistItem = (index: number): void => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
  };

  const updateChecklistItem = (index: number, value: string): void => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    setChecklistItems(newItems);
  };

  const inputClass = {
    label: "block text-sm font-normal text-[#020617] font-inter mb-2",
    input:
      "w-full border border-[#CBD5E1] bg-white rounded-md p-3 outline-none text-[#94A3B8] text-xs",
    error: "text-red-500 text-sm mt-1",
  };
  return (
    <div>
      <CommonHeader className="pb-6"> Examiner Checklist</CommonHeader>

      <div className="bg-white p-6">
        <div className="space-y-6">
          <CommonHeader className="">Task 1</CommonHeader>
          {/* Task Name Section */}
          <div className="space-y-3">
            <label className={inputClass.label}>Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className={inputClass.input}
            />
          </div>{" "}
          {/* Checklist Items Section */}
          <div className="space-y-3">
            <label className={inputClass.label}>Checklist Item</label>

            <div className="space-y-3">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className={inputClass.input}
                  />

                  {index === checklistItems.length - 1 ? (
                    <button
                      onClick={addChecklistItem}
                      className="p-3 text-green-600 hover:bg-green-50 rounded-md border border-gray-300 transition cursor-pointer"
                      aria-label="Add item"
                    >
                      <Plus size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeChecklistItem(index)}
                      className="p-3 cursor-pointer text-red-600 hover:bg-red-50 rounded-md border border-gray-300 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examiner;
