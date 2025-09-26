const Switch = ({ checked, onCheckedChange, disabled = false }) => (
  <button
    onClick={() => !disabled && onCheckedChange(!checked)}
    className={`
      relative inline-flex h-6 w-11 items-center rounded-full transition-colors
      ${checked ? "bg-blue-600" : "bg-gray-300"}
      ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    `}
    disabled={disabled}
  >
    <span
      className={`
        inline-block h-4 w-4 transform rounded-full bg-white transition-transform
        ${checked ? "translate-x-6" : "translate-x-1"}
      `}
    />
  </button>
);

export default Switch;