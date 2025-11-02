interface Tab<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (value: T) => void;
}

const Tabs = <T extends string>({ tabs, active, onChange }: TabsProps<T>) => {
  return (
    <div className="flex items-center flex-wrap xl:bg-white xl:border border-border xl:rounded-full p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-6 py-2 flex-shrink-0 text-sm font-medium rounded-full transition-colors cursor-pointer
            ${
              active === tab.value
                ? "bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)] text-white"
                : "text-gray-700 hover:text-blue-600"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
