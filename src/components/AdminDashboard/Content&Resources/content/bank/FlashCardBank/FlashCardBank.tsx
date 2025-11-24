import {
  useDeleteSingleFlashCardMutation,
  useGetSingleFlashCardsQuery,
  useUpdateSingleFlashCardMutation,
} from "@/store/features/adminDashboard/ContentResources/flashCard/flashCardSlice";
import { AllContentMCQList } from "@/store/features/adminDashboard/ContentResources/MCQ/types/allContent";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import McqBankCardForAdmin from "../../bank/MCQBank/McqBankCardForAdmin";
import EditFlashCardModal, { EditFlashCardInput } from "./EditFlashCardModal";
import SingleFlashCardCard from "./SingleFlashCardCard";

interface FlashCardBank {
  mcqBank: AllContentMCQList;
  bankId: string;
  setBankId: (id: string) => void;
}

const FlashCardBank: React.FC<FlashCardBank> = ({
  mcqBank,
  bankId,
  setBankId,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  console.log("setCurrentPage", setCurrentPage);

  const singleMcqQueryArg = bankId
    ? { id: bankId, page: currentPage, limit }
    : skipToken;

  const { data: singleMcqBank } = useGetSingleFlashCardsQuery(
    singleMcqQueryArg,
    { skip: bankId === "" }
  );

  const singleFlashBankData = singleMcqBank?.data.flashCards ?? [];

  const [deleteSingleFlashCard] = useDeleteSingleFlashCardMutation();
  const [updateSingleFlashCard, { isLoading }] =
    useUpdateSingleFlashCardMutation();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (flashBank: string, flashCardId: string) => {
    try {
      setDeletingId(flashCardId);
      await deleteSingleFlashCard({
        flashBankId: flashBank,
        flashCardId,
      }).unwrap();
    } finally {
      setDeletingId(null);
    }
  };

  // ---------------------------------------------------------------
  // Edit popup logic
  // ---------------------------------------------------------------

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EditFlashCardInput | null>(
    null
  );
  const [flashCardId, setFlashCardId] = useState<string | null>(null);

  const handleEdit = (card: EditFlashCardInput, id: string) => {
    setSelectedCard(card);
    setFlashCardId(id);
    setIsModalOpen(true);
  };

  const handleUpdate = async (values: EditFlashCardInput) => {
    if (!flashCardId) return;

    await updateSingleFlashCard({
      flashBankId: bankId,
      flashCardId: flashCardId,
      data: values,
    }).unwrap();

    setIsModalOpen(false);
  };

  return (
    <div>
      {bankId === "" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
          {mcqBank?.data?.map((data) => (
            <McqBankCardForAdmin
              key={data._id}
              data={data}
              setMcqBankId={setBankId}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {singleFlashBankData.map((data) => (
            <SingleFlashCardCard
              key={data.flashCardId}
              isLoading={deletingId === data.flashCardId}
              flashCardId={data.flashCardId}
              backText={data.backText}
              frontText={data.frontText}
              explanation={data.explanation}
              difficulty={data.difficulty}
              onEdit={() =>
                handleEdit(data as EditFlashCardInput, data.flashCardId)
              }
              onDelete={() => handleDelete(bankId, data.flashCardId)}
            />
          ))}
        </div>
      )}

      {isModalOpen && selectedCard && (
        <EditFlashCardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          isLoading={isLoading}
          onSubmit={handleUpdate}
          initialData={{
            frontText: selectedCard.frontText,
            backText: selectedCard.backText,
            explanation: selectedCard.explanation,
            difficulty: selectedCard.difficulty,
          }}
        />
      )}
    </div>
  );
};

export default FlashCardBank;
