type FlashCardProps = {
  flashCardId: string;
  frontText: string;
  backText: string;
  explanation: string;
  difficulty: string;
  image: string;
  isLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

const SingleFlashCardCard = ({
  flashCardId,
  frontText,
  backText,
  explanation,
  difficulty,
  image,
  isLoading,
  onEdit,
  onDelete,
}: FlashCardProps) => {
  return (
    <div className="border border-border rounded-xl shadow p-5 w-full max-w-md bg-white">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-500 font-medium">
          ID: {flashCardId}
        </span>
        <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600">
          {difficulty}
        </span>
      </div>

      <img
        src={image}
        alt="Image"
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Front</h3>
      <p className="text-gray-700 mb-4">{frontText}</p>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Back</h3>
      <p className="text-gray-700 mb-4">{backText}</p>

      <h3 className="text-lg font-semibold text-gray-800 mb-2">Explanation</h3>
      <p className="text-gray-600 mb-6">{explanation}</p>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg  cursor-pointer "
        >
          Edit
        </button>

        <button
          disabled={isLoading}
          onClick={onDelete}
          className="px-4 py-2 text-sm bg-red-500 cursor-pointer  hover:bg-red-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default SingleFlashCardCard;
