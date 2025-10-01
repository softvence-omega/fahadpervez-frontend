import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface FlashcardDeckCardProps {
  title: string;
  cards: number;
  subject: string;
  created: string;
  onPublish?: () => void;
  onAddFlashcard?: () => void;
  onDelete?: () => void;
}

const FlashcardDeckCard: React.FC<FlashcardDeckCardProps> = ({
  title,
  cards,
  subject,
  created,
  onPublish,
  onAddFlashcard,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <h3 className="text-base font-semibold text-gray-900 flex-1 pr-4">
          {title}
        </h3>
        <button
          onClick={onPublish}
          className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
        >
          Publish
        </button>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Cards:</span>
          <span className="text-gray-900 font-medium">{cards}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Subject:</span>
          <span className="text-gray-900 font-medium">{subject}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Created:</span>
          <span className="text-gray-900 font-medium">{created}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onAddFlashcard}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          Add Flashcard
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Delete deck"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Demo component showing multiple cards
// const FlashcardDeckList: React.FC = () => {
//   const decks = [
//     {
//       id: 1,
//       title: 'Anatomy - Cardiovascular System',
//       cards: 20,
//       subject: 'Anatomy',
//       created: '2025-09-22'
//     },
//     {
//       id: 2,
//       title: 'Anatomy - Cardiovascular System',
//       cards: 20,
//       subject: 'Anatomy',
//       created: '2025-09-22'
//     },
//     {
//       id: 3,
//       title: 'Anatomy - Cardiovascular System',
//       cards: 20,
//       subject: 'Anatomy',
//       created: '2025-09-22'
//     }
//   ];

//   const handlePublish = (id: number) => {
//     console.log(`Publishing deck ${id}`);
//     alert(`Deck ${id} published!`);
//   };

//   const handleAddFlashcard = (id: number) => {
//     console.log(`Adding flashcard to deck ${id}`);
//     alert(`Add flashcard to deck ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     console.log(`Deleting deck ${id}`);
//     if (confirm('Are you sure you want to delete this deck?')) {
//       alert(`Deck ${id} deleted!`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-2xl font-semibold text-gray-900 mb-8">
//           Flashcard Decks
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {decks.map((deck) => (
//             <FlashcardDeckCard
//               key={deck.id}
//               title={deck.title}
//               cards={deck.cards}
//               subject={deck.subject}
//               created={deck.created}
//               onPublish={() => handlePublish(deck.id)}
//               onAddFlashcard={() => handleAddFlashcard(deck.id)}
//               onDelete={() => handleDelete(deck.id)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

export default FlashcardDeckCard;