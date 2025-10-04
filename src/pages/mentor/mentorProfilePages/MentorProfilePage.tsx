import profileImage from "@/assets/dashboard/profileImage.png";
import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { Rating } from "@smastrom/react-rating";
// import "@smastrom/react-rating/style.css";

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
    <div className="my-8 md:my-10">
      {/* Background Image */}
      <img src={profileBg} alt="Profile Background" className="w-full" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 -mt-5 mb-10 px-2 md:px-11">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
            <div className="text-center">
              <img
                src={profileImage}
                alt=""
                className="mx-auto w-28 h-28 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-black mt-2">
                Emma Harrison
              </h3>
              <p className="text-slate-700">Medical Student</p>
            </div>

            <div className="mt-6 space-y-3 text-sm sm:text-base">
              <div>
                <p>
                  <span className="font-medium">Average rating </span>
                </p>
                <div className="flex items-center gap-3">
                  {/* <Rating style={{ maxWidth: 130 }} value={3} readOnly /> */}
                  <Star className="text-[#21A391]" />
                  <p className="text-sm text-[#475569]">
                    4.8 <span>(60 Reviews)</span>
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="flex flex-col text-sm font-medium">
                    Completion Rate
                    <span className="text-sm font-normal text-[#475569]">
                      93%
                    </span>
                  </p>
                  <Link to={"/mentor/mentor-review"}>
                    <p className="text-blue-main underline cursor-pointer">
                      View Review
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setOpen((prev) => !prev)}
            className="w-3xs h-12 mt-5 bg-blue-main hover:bg-blue-600 cursor-pointer"
          >
            Edit Profile
          </Button>
        </div>

        {/* Personal Info */}
        <div className="col-span-1 md:col-span-2 bg-white border border-slate-300 rounded-[8px] px-5 sm:px-7 lg:px-9 py-7 sm:py-9 lg:py-11">
          <div>
            <h3 className="text-lg sm:text-xl text-slate-900 font-medium border-b-2 border-b-slate-300 pb-2">
              Profile Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4 space-y-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"Enter first name"}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Last Name</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"Enter last name"}
                </div>
              </div>

              <div className="col-span-2 grid gap-2">
                <Label>Email Address</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"sarah.johnson@email.com"}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Medical Speciality</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"e.g. Cardiology"}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Current Role</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"e.g. Resident Doctor"}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Post Graduate</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"e.g. MD, MS"}
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Year of Experience</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50">
                  {"e.g. 5"}
                </div>
              </div>

              <div className="grid col-span-2 gap-2">
                <Label>Bio</Label>
                <div className="p-3 rounded-md bg-[#EFF6FF66] border border-blue-50 min-h-[120px]">
                  {"Write about yourself..."}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blank Div For Grid layout */}
        <div></div>
        {/* Basic and Bank Info */}
        <div className="col-span-2 bg-white shadow-sm border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-base font-semibold underline">Basic info</h2>
          {data.degree && (
            <div className="space-y-1">
              <p className="text-sm font-medium">your Degree</p>
              <img
                src={data.degree}
                alt="Degree"
                className="w-32 h-20 object-cover cursor-pointer border rounded"
                onClick={() => openModal(data.degree!)}
              />
            </div>
          )}
          {data.nid && (
            <div className="space-y-1">
              <p className="text-sm font-medium">
                NID/Passport/Driving License
              </p>
              <img
                src={data.nid}
                alt="NID"
                className="w-32 h-20 object-cover cursor-pointer border rounded"
                onClick={() => openModal(data.nid!)}
              />
            </div>
          )}
          {data.certificate && (
            <div className="space-y-1">
              <p className="text-sm font-medium">
                your professional certificate
              </p>
              <img
                src={certificate}
                alt="Certificate"
                className="w-32 h-20 object-cover cursor-pointer border rounded"
                onClick={() => openModal(data.certificate!)}
              />
            </div>
          )}

          <h2 className="text-base font-semibold underline mt-4">Bank info</h2>
          <p className="text-sm font-medium text-[#020617] mt-3.5">
            Account Details
          </p>
          <p className="text-sm font-medium">Name: {data.fullName}</p>
          <p className="text-sm font-medium">Bank Name: {data.bankName}</p>
          <p className="text-sm font-medium">
            Account Number: {data.accountNumber}
          </p>
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
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-700 cursor-pointer"
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
