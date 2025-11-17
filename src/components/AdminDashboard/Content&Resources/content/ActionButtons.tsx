import ButtonWithLoading from "@/common/button/ButtonWithLoading";
import CommonButton from "@/common/button/CommonButton";
import React from "react";

interface ActionButtonsProps {
  onSavePublish: () => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isLoading,
  onCancel,
  onSavePublish,
}) => {
  return (
    <div className="flex items-center justify-end gap-6 pt-6">
      <div className="flex flex-col sm:flex-row gap-3 ">
        <CommonButton
          type="button"
          className="bg-blue-500 !text-white"
          disabled={isLoading}
          onClick={onSavePublish}
        >
          {isLoading ? (
            <ButtonWithLoading title="Saving..." />
          ) : (
            "Save & Publish Question"
          )}
        </CommonButton>
      </div>
      <CommonButton onClick={onCancel}>Cancel</CommonButton>
    </div>
  );
};

export default ActionButtons;
