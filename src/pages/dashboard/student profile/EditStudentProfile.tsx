import profileBg from "@/assets/dashboard/profileBg.png";
import { Button } from "@/components/ui/button";
import EditStudentProfileModal from "./EditStudentProfileModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/auth/auth.slice";
// import { useGetMeMutation } from "@/store/features/auth/auth.api";

export default function EditStudentProfile() {
  const [open, setOpen] = useState(false);

  const user = useSelector(selectUser);

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
                src={user?.profile?.profile_photo}
                alt=""
                className="mx-auto w-28 h-28 object-cover rounded-full"
              />
              <h3 className="text-xl font-semibold text-black mt-2">
                {user?.profile?.firstName} {user?.profile?.lastName}
              </h3>
              <p className="text-slate-700">{user?.profile?.studentType}</p>
            </div>

            <div className="mt-6 space-y-3 text-sm sm:text-base">
              <p>
                <span className="font-medium">University:</span>{" "}
                {user?.profile?.university}
              </p>
              <p>
                <span className="font-medium">Year of Study:</span>{" "}
                {user?.profile?.year_of_study}
              </p>
              <p>
                <span className="font-medium">Preparing For:</span>{" "}
                {user?.profile?.preparingFor}
              </p>
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
              Personal Information
            </h3>

            <div className="mt-4 sm:mt-6 space-y-4">
              {[
                {
                  label: "Name",
                  value: `${user?.profile?.firstName} ${user?.profile?.lastName}`,
                },
                { label: "Email", value: `${user?.account?.email}` },
                { label: "Phone", value: "+20 214521" },
                { label: "Country", value: `${user?.profile?.country}` },
                { label: "University", value: `${user?.profile?.university}` },
                {
                  label: "Preparing For",
                  value: `${user?.profile?.preparingFor}`,
                },
                { label: "Bio", value: `${user?.profile?.bio}` },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-red-400 border-dotted pb-2"
                >
                  <h4 className="text-slate-800 font-medium">{item.label}:</h4>
                  <p className="text-slate-800 text-sm sm:text-base mt-1 sm:mt-0">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EditStudentProfileModal open={open} setOpen={setOpen} user={user} />
    </div>
  );
}
