import mentorImage1 from "@/assets/home/mentor1.png";

export default function MentorCard() {
  return (
    <div className="bg-slate-50 p-[14px] rounded-[20px]">
      <img
        src={mentorImage1}
        alt="mentorImage"
        className="rounded-[10px] mx-auto w-full mb-5"
      />
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-black leading-7 font-inter">
          Azad Kibria
        </h3>
        <button className="text-base text-white font-medium leading-6 py-3 px-4 rounded-lg bg-linear-to-r from-[#0076F5] to-[#0058B8] cursor-pointer">
          +
        </button>
      </div>
      <p className="text-lg text-blue-800 font-medium leading-6">
        Dermatologist
      </p>
    </div>
  );
}
