import CommonButton from "@/common/button/CommonButton";
import React from "react";

interface ActionButtonsProps {
  onImport: () => void;
  onCancel: () => void;
  importLabel: string;
  isLoading?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onImport,
  onCancel,
  importLabel,
  isLoading,
}) => (
  <div className="flex gap-4">
    <CommonButton
      onClick={onImport}
      className=" !bg-[linear-gradient(103deg,#0076F5_6.94%,#0058B8_99.01%)]
      !text-white"
    >
      {importLabel}
    </CommonButton>
    <CommonButton disabled={isLoading} onClick={onCancel} className="">
      Cancel
    </CommonButton>
  </div>
);

export default ActionButtons;
