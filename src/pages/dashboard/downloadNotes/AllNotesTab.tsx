/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalLoader2 from "@/common/GlobalLoader2";
import NoteCard from "@/components/reusable/NoteCard";

export default function AllNotesTab({ notes, loading }: any) {
  if (loading) return <GlobalLoader2 />;

  // Open PDF in new tab
  const handleViewPdf = (url: string) => {
    window.open(url, "_blank"); // open in new tab
  };

  const handleDownloadPdf = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "note.pdf"; // filename for download
    link.click(); // trigger download
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 p-4 bg-white shadow rounded-lg">
        {notes?.map((note: any) => (
          <NoteCard
            key={note._id}
            tag={note.subject}
            title={note.title}
            description={note.description}
            chapter="—"
            pages="—"
            downloads="—"
            pdfUrl={note.notes[0].fileUrl}
            pdfId={note.notes[0].fileId}
            onViewNotes={() => handleViewPdf(note.notes[0].fileUrl)} // open in new tab
            onDownload={() => handleDownloadPdf(note.notes[0].fileId)} // download
          />
        ))}
      </div>
    </div>
  );
}
