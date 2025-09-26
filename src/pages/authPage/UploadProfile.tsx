import { Plus, X } from "lucide-react";
import { useState } from "react";
import profileImage from "@/assets/signUp/Upload Photo.png";

export default function UploadProfile() {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [bio, setBio] = useState("");
  const maxLength = 300;

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = () => {
    setPreview(null);
    (document.getElementById("fileInput") as HTMLInputElement).value = "";
  };

  return (
    <div>
      <h2 className="font-bricolage text-5xl font-semibold text-center mb-2">
        Upload Your Photo
      </h2>
      <p className="mb-14 text-center">
        Select your primary goals so our AI can focus on what matters most
      </p>

      <div>
        {/* Upload Box */}
        <div>
          <div
            className={`p-8 text-center cursor-pointer transition relative border-2 rounded-xl ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="relative">
                {/* Preview OR Placeholder */}
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
                    />
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={profileImage}
                      alt="placeholder"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                    <Plus className="bg-blue-600 text-white rounded-full -bottom-2 left-12 absolute" />
                  </div>
                )}
              </span>
            </div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <label
            htmlFor="bio"
            className="block font-medium text-gray-700 mb-1"
          >
            Bio
          </label>
          <textarea
            name="bio"
            id="bio"
            rows={5}
            maxLength={maxLength}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border-2 border-slate-300 rounded-[8px] p-5"
            placeholder="Write something about yourself..."
          ></textarea>
          <p className="text-sm text-gray-500 mt-1 text-right">
            {bio.length}/{maxLength}
          </p>
        </div>
      </div>
    </div>
  );
}
