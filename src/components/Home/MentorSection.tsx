import CommonWrapper from "@/common/CommonWrapper";
import MentorCard from "./MentorCard";

export default function MentorSection() {
    return (
        <div>
            <CommonWrapper>
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-3xl font-bricolage text-black font-semibold leading-9">Expert Mentorship for Tomorrow's Doctors</h2>
                    <button className="text-sm text-white font-medium leading-6 py-3 px-4 rounded-lg bg-linear-to-r from-[#0076F5] to-[#0058B8] cursor-pointer">All Professor</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <MentorCard />
                    <MentorCard />
                    <MentorCard />
                    <MentorCard />
                </div>
            </CommonWrapper>
        </div>
    )
}
