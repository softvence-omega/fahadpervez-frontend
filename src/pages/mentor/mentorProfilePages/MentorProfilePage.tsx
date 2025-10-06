import profileImage from "@/assets/dashboard/profileImage.png";
import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import certificate from "@/assets/dashboard/certificate.jpg";
import { Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import EditMentorProfileModal from "./EditMentorProfileModal";
import { Label } from "@/components/ui/label";

export default function MentorProfilePage() {
  const [open, setOpen] = useState(false);

  const data = {
    degree:
      "https://img.freepik.com/free-vector/realistic-certificate-template_52683-83834.jpg?semt=ais_hybrid&w=740&q=80",
    nid: "https://static.wixstatic.com/media/be895c_0cb803b4796449bdb715628c84ae17ee~mv2.png/v1/fill/w_964,h_591,al_c,q_90/be895c_0cb803b4796449bdb715628c84ae17ee~mv2.png",
    certificate:
      "https://img.freepik.com/free-vector/realistic-certificate-template_52683-83834.jpg?semt=ais_hybrid&w=740&q=80",
    fullName: "Emma Harrison",
    bankName: "Bank of Denmark",
    accountNumber: "123456789012",
  };

  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (imgUrl: string) => setModalImage(imgUrl);
  const closeModal = () => setModalImage(null);

  return (
    <div className="my-6 sm:my-10">
      {/* Background Image */}
      <img
        src={profileBg}
        alt="Profile Background"
        className="w-full object-cover h-32 sm:h-48 lg:h-60"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-9 -mt-5 mb-10 px-3 sm:px-6 lg:px-11">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white border border-slate-300 rounded-lg p-4 sm:p-6">
            <div className="text-center">
              <img
                src={profileImage}
                alt="Profile"
                className="mx-auto w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 object-cover rounded-full"
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black mt-2">
                Emma Harrison
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                Medical Student
              </p>
            </div>

            <div className="mt-6 space-y-4 text-sm sm:text-base">
              <div>
                <p className="font-medium">Average rating</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Star className="text-[#21A391]" />
                  <p className="text-sm sm:text-base text-[#475569]">
                    4.8 <span>(60 Reviews)</span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2">
                  <p className="flex flex-col text-sm font-medium">
                    Completion Rate
                    <span className="text-sm font-normal text-[#475569]">
                      93%
                    </span>
                  </p>
                  <Link to={"/mentor/mentor-review"}>
                    <p className="text-blue-main underline cursor-pointer text-sm sm:text-base">
                      View Review
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full sm:w-auto h-12 mt-5 bg-blue-main hover:bg-blue-600 cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile Information */}
        <div className="col-span-1 lg:col-span-2 bg-white border border-slate-300 rounded-lg p-5 sm:p-7 lg:p-9">
          <h3 className="text-lg sm:text-xl text-slate-900 font-medium border-b pb-2">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
            {[
              { label: "First Name", value: "Enter first name" },
              { label: "Last Name", value: "Enter last name" },
              { label: "Email Address", value: "sarah.johnson@email.com", full: true },
              { label: "Medical Specialty", value: "e.g. Cardiology" },
              { label: "Current Role", value: "e.g. Resident Doctor" },
              { label: "Post Graduate", value: "e.g. MD, MS" },
              { label: "Year of Experience", value: "e.g. 5" },
              { label: "Bio", value: "Write about yourself...", full: true, large: true },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`grid gap-2 ${item.full ? "md:col-span-2" : ""}`}
              >
                <Label className="text-[#2D2D2D]">{item.label}</Label>
                <div
                  className={`p-3 rounded-md text-[#716E6E] bg-[#EFF6FF66] border border-blue-50 ${
                    item.large ? "min-h-[100px]" : ""
                  }`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div></div>

        {/* Basic & Bank Info */}
        <div className="col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 sm:p-6 space-y-5">
          <h2 className="text-base sm:text-lg font-semibold underline">
            Basic info
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.degree && (
              <div>
                <p className="text-sm font-medium mb-1">Your Degree</p>
                <img
                  src={data.degree}
                  alt="Degree"
                  className="w-28 sm:w-40 h-20 object-cover cursor-pointer border rounded"
                  onClick={() => openModal(data.degree!)}
                />
              </div>
            )}
            {data.nid && (
              <div>
                <p className="text-sm font-medium mb-1">
                  NID/Passport/Driving License
                </p>
                <img
                  src={data.nid}
                  alt="NID"
                  className="w-28 sm:w-40 h-20 object-cover cursor-pointer border rounded"
                  onClick={() => openModal(data.nid!)}
                />
              </div>
            )}
            {data.certificate && (
              <div>
                <p className="text-sm font-medium mb-1">
                  Professional Certificate
                </p>
                <img
                  src={certificate}
                  alt="Certificate"
                  className="w-28 sm:w-40 h-20 object-cover cursor-pointer border rounded"
                  onClick={() => openModal(data.certificate!)}
                />
              </div>
            )}
          </div>

          <h2 className="text-base sm:text-lg font-semibold underline mt-4">
            Bank info
          </h2>
          <div className="space-y-1 text-sm sm:text-base">
            <p className="font-medium">Account Details</p>
            <p>Name: {data.fullName}</p>
            <p>Bank Name: {data.bankName}</p>
            <p>Account Number: {data.accountNumber}</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={modalImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      <EditMentorProfileModal open={open} setOpen={setOpen} />
    </div>
  );
}
