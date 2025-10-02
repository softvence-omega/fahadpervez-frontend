import { useState } from "react"
import { X, FileImage } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface UploadFilesProps {
  onClose: () => void
  onUploadComplete: (url: string) => void
}

interface UploadedFile {
  id: string
  name: string
  size: string
  date: string
  url: string
}

const MentorUploadFiles = ({ onClose, onUploadComplete }: UploadFilesProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file)

      return {
        id: Math.random().toString(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toISOString().split("T")[0],
        url,
      }
    })

    setUploadedFiles((prev) => [...prev, ...newFiles])
  }

  const handleUploadFiles = () => {
    if (uploadedFiles.length > 0) {
      const firstImage = uploadedFiles[0]
      if (firstImage && firstImage.url) {
        onUploadComplete(firstImage.url)
      }
    }
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] sm:h-[70vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4 flex-shrink-0">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Upload Files</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Upload materials for your Students</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Body - Two Column Layout (Responsive) */}
          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Left Panel - Upload Area */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 overflow-y-auto border-b md:border-b-0 bg-white">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Upload Media</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                  Upload Images or Pdf
                </p>

                <label
                  htmlFor="file-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-8 sm:p-12 lg:p-20 text-center hover:border-blue-400 transition-colors cursor-pointer block bg-white"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-gray-900 font-medium mb-1 text-sm sm:text-base">
                      Click to upload files
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Support: JPG, PNG, PDF (Max 100MB)
                    </p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            {/* Right Panel - Recent Uploads */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 sm:p-6 lg:p-8 overflow-y-auto flex flex-col">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Recent Uploads</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                  Your uploaded files ready for quiz generation
                </p>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <AnimatePresence mode="popLayout">
                    {uploadedFiles.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-8 sm:py-12 text-gray-400"
                      >
                        <FileImage className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                        <p className="text-xs sm:text-sm">No files uploaded yet</p>
                      </motion.div>
                    ) : (
                      uploadedFiles.map((file, index) => (
                        <motion.div
                          key={file.id}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95, x: -20 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.05,
                            ease: "easeOut"
                          }}
                          layout
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                            <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {file.name}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                              {file.size} • {file.date}
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveFile(file.id)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0 transition-colors cursor-pointer"
                          >
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-red-500 flex items-center justify-center hover:bg-red-50 transition-colors">
                              <X className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                            </div>
                          </motion.button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Upload Button at Bottom */}
              <div className="mt-auto pt-3 sm:pt-4 border-t border-gray-200">
                <motion.button
                  whileHover={{ scale: uploadedFiles.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: uploadedFiles.length > 0 ? 0.98 : 1 }}
                  onClick={handleUploadFiles}
                  disabled={uploadedFiles.length === 0}
                  className="w-full px-4 py-2.5 sm:py-3.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-medium flex items-center justify-center gap-2 text-sm sm:text-base disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Files {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MentorUploadFiles;