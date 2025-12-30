import Pagination from "@/common/custom/Pagination";
import NoteCard from "@/components/reusable/NoteCard";
import { useGetAllGeneratedNotesQuery } from "@/store/features/note/NoteAPI";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GeneratedNotes() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: notesResponse, isLoading } = useGetAllGeneratedNotesQuery({
    page,
    limit,
  });

  const notes = notesResponse?.data || [];
  const meta = notesResponse?.meta;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p>No generated notes found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
          {notes.map((note: any) => (
            <NoteCard
              key={note._id}
              tag={"Generated"}
              title={note.title || "Untitled Note"}
              description={
                note.note
                  ? note.note.substring(0, 100) + "..."
                  : "No content available"
              }
              chapter={new Date(note.createdAt).toLocaleDateString()} // Use date as secondary info
              showDownload={false}
              pages={0}
              pdfUrl=""
              pdfId=""
              onViewNotes={() =>
                navigate(`/dashboard/generated-notes/${note._id}`)
              }
            />
          ))}
        </div>

        {meta && meta.totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={meta.page}
              totalPages={meta.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
