import React, { useRef, useState } from "react";
import { FaUser } from "react-icons/fa";
import bannerDefault from "@/assets/home/banner.jpg";
import CommonButton from "@/common/button/CommonButton";
import MediumHeader from "@/common/header/MediumHeader";
import CommonHeader from "@/common/header/CommonHeader";
import camera from "@/assets/home/camera.png";
import { Link } from "react-router-dom";

interface UserProfileProps {
  fullName: string;
  email: string;
  phone: string;
  country?: string;
  university?: string;
  preparingFor?: string;
  bio?: string;
  profileImage: string;
  yearOfStudy?: string;
  profession?: string;
  backLink: string;
}

const inputClass = {
  input:
    "text-sm font-normal text-[#0F172A] font-inter leading-[20px] outline-none transition w-full px-4 py-3 border border-border rounded-md ",
  label:
    "text-sm font-normal text-[#18181B] font-inter leading-[20px] block mb-2",
};

const UserProfile: React.FC<UserProfileProps> = ({
  fullName,
  email,
  phone,
  country,
  university,
  preparingFor,
  bio,
  profileImage,
  yearOfStudy,
  profession,
  backLink,
}) => {
  const [bannerPreview, setBannerPreview] = useState<string>(bannerDefault);
  const [profilePreview, setProfilePreview] = useState<string>(profileImage);

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBannerPreview(url);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePreview(url);
    }
  };

  return (
    <div className="">
      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Dashboard &gt;{" "}
          <span className="text-gray-800 font-medium">AI Tutor</span>
        </p>
      </div>

      <div className="relative h-[215px]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={bannerPreview}
          alt="Banner"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2))] rounded-lg"></div>

        <div
          className="absolute top-1 right-1 bg-white w-10 h-10 rounded-full flex items-center justify-center border border-[#94A3B8] cursor-pointer"
          onClick={() => bannerInputRef.current?.click()}
        >
          <img src={camera} alt="Upload banner" />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={bannerInputRef}
            onChange={handleBannerChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mx-5 absolute top-1/2 left-0 right-0">
          <div>
            <div className="bg-white rounded-md flex flex-col items-center w-full max-w-[415px] px-6 pb-10">
              <div className="relative">
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white -mt-10"
                />
                <div
                  className="absolute top-10 right-0 bg-white w-10 h-10 rounded-full flex items-center justify-center border border-[#94A3B8] cursor-pointer"
                  onClick={() => profileInputRef.current?.click()}
                >
                  <img src={camera} alt="Upload profile" />
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={profileInputRef}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <MediumHeader className="mt-4 !text-xl !font-semibold">
                {fullName}
              </MediumHeader>
              <CommonHeader className=" !font-normal !text-[#334155]">
                {profession}
              </CommonHeader>

              <div className="mt-4 space-y-1">
                <CommonHeader className="!text-[#334155] !font-normal">
                  University: {university}
                </CommonHeader>
                {yearOfStudy && (
                  <CommonHeader className="!text-[#334155] !font-normal">
                    Year of Study: {yearOfStudy}
                  </CommonHeader>
                )}
                <CommonHeader className="!text-[#334155] !font-normal">
                  Preparing For: {preparingFor}
                </CommonHeader>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <CommonButton className="!bg-[#1D4ED8] !text-white ">
                Deactivate user
              </CommonButton>
              <CommonButton className="">
                <Link to={backLink}>Back</Link>
              </CommonButton>
            </div>
          </div>

          <div className="bg-white rounded-md p-6 flex-1">
            <CommonHeader className="!text-lg !font-semibold mb-4 flex items-center gap-2 !text-[#2D2D2D]">
              <FaUser /> Profile Information
            </CommonHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className={inputClass.label}>Full Name</label>
                <input value={fullName} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Email Address</label>
                <input value={email} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Phone Number</label>
                <input value={phone} readOnly className={inputClass.input} />
              </div>
              <div>
                <label className={inputClass.label}>Country</label>
                <input
                  value={country || "Not provided"}
                  readOnly
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>University</label>
                <input
                  value={university}
                  readOnly
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>Preparing For</label>
                <input
                  value={preparingFor}
                  readOnly
                  className={inputClass.input}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className={inputClass.label}>Bio</label>
              <textarea
                value={bio}
                readOnly
                className={inputClass.input}
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
