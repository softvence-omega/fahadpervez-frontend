// components/WeeklyPlan.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, Filter, CheckCircle, XCircle, Clock, MinusCircle, Target } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import image1 from "@/assets/dashboard/planImage.png"

type DayKey = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
type SessionStatus = "pending" | "active" | "complete" | "missed";

interface StudySession {
    id: string;
    title: string;
    time: string;
    type: string;
    duration: string;
    status: SessionStatus;
}

interface DayPlan {
    day: DayKey;
    sessions: StudySession[];
}

export default function WeeklyPlan() {
    const weeklyPlan: DayPlan[] = [
        {
            day: "MON",
            sessions: [
                { id: "1", title: "Esophageal Disorders", time: "9:00–10:00", type: "MCQs", duration: "1h", status: "complete" },
                { id: "2", title: "Gastric & Duodenal Diseases", time: "10:30–12:30", type: "Notes Review", duration: "2h", status: "complete" },
            ],
        },
        {
            day: "TUE",
            sessions: [
                { id: "3", title: "Esophageal Disorders", time: "9:00–10:00", type: "MCQs", duration: "1h", status: "missed" },
                { id: "4", title: "Gastric & Duodenal Diseases", time: "10:30–12:30", type: "Notes Review", duration: "2h", status: "missed" },
            ],
        },
        {
            day: "WED",
            sessions: [
                { id: "5", title: "Esophageal Disorders", time: "9:00–10:00", type: "MCQs", duration: "1h", status: "pending" },
                { id: "6", title: "Gastric & Duodenal Diseases", time: "10:30–12:30", type: "Notes Review", duration: "2h", status: "pending" },
            ],
        },
    ];

    const getDayName = (day: DayKey) => {
        const map: Record<DayKey, string> = {
            MON: "Monday", TUE: "Tuesday", WED: "Wednesday", THU: "Thursday",
            FRI: "Friday", SAT: "Saturday", SUN: "Sunday",
        };
        return map[day];
    };

    return (
        <div className="mb-10 bg-slate-50">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to={"/dashboard/my-plan"} className="mb-7"><ArrowLeft /></Link>
                    <DashboardHeading
                        title="Gastroenterology & Hepatology Block Exam"
                        titleSize="text-xl"
                        description="Exam : 04/09/25"
                        className="mt-12 mb-12 space-y-1"
                    />
                </div>
                <p className="text-lg text-white font-semibold bg-green-700 rounded-full pt-0.5 px-2.5">Active</p>
            </div>

            <div className="flex items-center gap-3 px-7 py-3 border border-blue-500 bg-blue-50 rounded-[8px] my-12">
                <Target className="text-blue-600 bg-blue-200 p-2 rounded-full w-10 h-10" />
                <div>
                    <h3 className="text-[#1C398E] mb-2">Plan Updated Based on Performance</h3>
                    <p className="text-sm text-[#1447E6]">Your recent quiz performance indicated weakness in PUD and GERD management. I've added a focused review session for tomorrow morning.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-3">
                    <Card className="border-0 bg-transparent shadow-none">
                        <CardHeader className="flex items-center justify-between mb-5">
                            <h2 className="text-xl text-[#0A0A0A] font-semibold">Your Weekly Plan</h2>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="sm" className="bg-blue-600 text-white">
                                        <Filter className="w-4 h-4 mr-1" /> Filter
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>This Week</DropdownMenuItem>
                                    <DropdownMenuItem>Next Week</DropdownMenuItem>
                                    <DropdownMenuItem>Completed</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardHeader>
                        <CardContent>
                            {/* Day Status Summary */}
                            <div className="grid grid-cols-7 gap-2 mb-10">
                                {(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as DayKey[]).map((dayKey) => {
                                    const dayPlan = weeklyPlan.find((d) => d.day === dayKey);
                                    const total = dayPlan ? dayPlan.sessions.length : 0;
                                    const completed = dayPlan ? dayPlan.sessions.filter((s) => s.status === "complete").length : 0;

                                    let statusIcon; let colorClass = "";
                                    if (total === 0) { statusIcon = <MinusCircle className="w-4 h-4" />; colorClass = "text-gray-400 border-gray-300"; }
                                    else if (completed === total) { statusIcon = <CheckCircle className="w-4 h-4" />; colorClass = "text-green-600 border-green-500"; }
                                    else if (completed > 0) { statusIcon = <Clock className="w-4 h-4" />; colorClass = "text-orange-500 border-orange-400"; }
                                    else { statusIcon = <XCircle className="w-4 h-4" />; colorClass = "text-red-500 border-red-400"; }

                                    return (
                                        <div key={dayKey} className="flex flex-col items-center text-sm font-medium">
                                            <span className="text-xs mb-1">{dayKey}</span>
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full border ${colorClass}`}>
                                                {statusIcon}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border border-slate-300 p-7 rounded-[8px] bg-white shadow">
                                <div className="flex justify-between items-center mb-7">
                                    <p>Week 1: Foundation Building</p>
                                    <p className="text-white bg-green-600 px-3 py-1 rounded">Active</p>
                                </div>
                                {/* Detailed Plan */}
                                <div className="space-y-6">
                                    {(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as DayKey[]).map((dayKey) => {
                                        const dayPlan = weeklyPlan.find((d) => d.day === dayKey);
                                        return (
                                            <div key={dayKey} className="space-y-3 border border-slate-300 p-4 rounded-[8px]">
                                                <h3 className="text-lg font-semibold">{getDayName(dayKey)}</h3>
                                                {dayPlan && dayPlan.sessions.length > 0 ? (
                                                    dayPlan.sessions.map((session) => (
                                                        <Card key={session.id} className="p-4 bg-[#F9FAFB] border-0">
                                                            <div className="flex justify-between items-center">
                                                                <div>
                                                                    <h4 className="font-semibold">{session.title}</h4>
                                                                    <p className="text-sm text-gray-600">{session.time} • {session.type} • {session.duration}</p>
                                                                </div>
                                                                {session.status === "complete" ? (
                                                                    <div className="flex items-center gap-1 text-green-600 font-medium"><CheckCircle className="w-4 h-4" /> Completed</div>
                                                                ) : session.status === "active" ? (
                                                                    <Badge className="bg-blue-500 text-white">Active</Badge>
                                                                ) : session.status === "missed" ? (
                                                                    <div className="flex items-center gap-1 text-red-500 font-medium"><XCircle className="w-4 h-4" /> Missed</div>
                                                                ) : (
                                                                    <Button size="sm">Start</Button>
                                                                )}
                                                            </div>
                                                        </Card>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500 text-sm">No tasks for this day</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Section */}
                <div className=" col-span-2">
                    <div className="border border-slate-300 p-6 rounded-[8px]">
                        <h3 className="flex items-center gap-2 mb-7 text-xl text-[#111827]"><img src={image1} alt="" className="w-5" /> AI Recommendations</h3>
                        <div className="space-y-4">
                            <Card className="border-yellow-300 bg-[#FEF08A]">
                                <CardHeader><CardTitle className="text-yellow-900">Targeted MCQs</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-sm text-[#CA8A04] mb-2">Focus quiz on Gastric & Duodenal Pathology MCQs</p>
                                    <Button size="sm" className="text-yellow-600 bg-white">Start Quiz</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-blue-300 bg-[#BFDBFE]">
                                <CardHeader><CardTitle className="text-blue-700">Clinical Case</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-sm text-[#1D4ED8] mb-2">Patient with Chronic Dyspepsia case study</p>
                                    <Button variant="outline" size="sm" className="text-[#2563EB]">View Case</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-green-300 bg-[#BBF7D0]">
                                <CardHeader><CardTitle className="text-green-700">Download Notes</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-sm text-[#15803D] mb-2">Pharmacological Management of Acid-Peptic Disorders</p>
                                    <Button variant="outline" size="sm" className="text-[#16A34A]">Download</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-purple-300 bg-[#E9D5FF]">
                                <CardHeader><CardTitle className="text-purple-700">AI Tutor</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-sm text-[#7E22CE] mb-2">Quick clarification on PPI mechanisms?</p>
                                    <Button variant="outline" size="sm" className="text-[#9333EA]">Chat Now</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
