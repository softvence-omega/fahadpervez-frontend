import profileImage from "@/assets/dashboard/profileImage.png"
import profileBg from "@/assets/dashboard/profileBg.png"

export default function EditStudentProfile() {
    return (
        <div>
            {/* Background Image */}
            <img src={profileBg} alt="Profile Background" className="w-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 -mt-5 mb-10 px-2 md:px-11">
                {/* Profile Card */}
                <div className="col-span-1">
                    <div className="bg-white border border-slate-300 rounded-[8px] p-4 md:p-6">
                        <div className="text-center">
                            <img src={profileImage} alt="" className="mx-auto w-28 h-28 object-cover rounded-full" />
                            <h3 className="text-xl font-semibold text-black mt-2">Emma Harrison</h3>
                            <p className="text-slate-700">Medical Student</p>
                        </div>

                        <div className="mt-6 space-y-3 text-sm sm:text-base">
                            <p><span className="font-medium">University:</span> Heriot-Watt University</p>
                            <p><span className="font-medium">Year of Study:</span> 2nd Year</p>
                            <p><span className="font-medium">Preparing For:</span> PLAB</p>
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="col-span-1 md:col-span-2 bg-white border border-slate-300 rounded-[8px] px-5 sm:px-7 lg:px-9 py-7 sm:py-9 lg:py-11">
                    <div>
                        <h3 className="text-lg sm:text-xl text-slate-900 font-medium border-b-2 border-b-slate-300 pb-2">
                            Personal Information
                        </h3>

                        <div className="mt-4 sm:mt-6 space-y-4">
                            {[
                                { label: "Name", value: "Emma Harrison" },
                                { label: "Email", value: "demo@gmail.com" },
                                { label: "Phone", value: "+20 214521" },
                                { label: "Country", value: "Netherland" },
                                { label: "University", value: "Heriot-Watt University" },
                                { label: "Preparing For", value: "PLAB" },
                                { label: "Bio", value: "I have taught third....." },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-red-400 border-dotted pb-2"
                                >
                                    <h4 className="text-slate-800 font-medium">{item.label}:</h4>
                                    <p className="text-slate-800 text-sm sm:text-base mt-1 sm:mt-0">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
