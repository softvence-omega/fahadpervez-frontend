
import studyPlanImage from "@/assets/home/study_plan_image.png"

export default function StudyPlanSection() {
    return (
        <div>
            <div>
                <h2 className="text-5xl text-[#1F2937] font-semibold leading-14">Innovative AI Study plan for
                    better Education.</h2>
                <p className="text-[#181818] font-normal leading-6 border border-b pb-9 mt-9 mb-6">Every year, we change the lives of millions of students. We enable them to explore all their study options in one place and to find the best fit study programme that matches their goals, and preferences. In order to succeed in this mission, we work with institutions who are eager to diversify their campuses and attract best-fit students from all over the world.</p>
            </div>
            <div>
                <img src={studyPlanImage} alt="" />
            </div>
        </div>
    )
}
