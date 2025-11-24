export interface UpdateNotesResponse {
  success: boolean;
  message: string;
  data: NotesData;
  meta: null;
}

export interface NotesData {
  _id: string;
  title: string;
  description: string;
  subject: string;
  system: string;
  topic: string;
  subtopic: string;
  slug: string;
  studentType: string;
  type: string;
  uploadedBy: string;
  notes: NoteFile[];
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFile {
  fileId: string;
  fileType: string;
  fileUrl: string;
  fileName: string;
}
