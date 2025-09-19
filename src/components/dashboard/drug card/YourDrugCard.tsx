import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import DashboardHeading from "@/components/reusable/DashboardHeading";
import { BreadcrumbItem } from "../gamified-learning/types";

export default function YourDrugCard() {
    const breadcrumbs: BreadcrumbItem[] = [
        { name: "Dashboard", link: "/dashboard" },
        { name: "Diagram Explorer", link: "/dashboard/diagram-explorer" },
    ];

    return (
        <div className="my-6">
            <Breadcrumb breadcrumbs={breadcrumbs} />
            <DashboardHeading
                title="Diagram Explorer"
                titleSize="text-xl"
                titleColor="text-[#0A0A0A]"
                description="Concept for Medical Learning Platform"
                descColor="text-[#4A5565]"
                descFont="text-sm"
                className="mb-8"
            />

            <h3 className="font-medium mb-5">Your Drag Card</h3>
            <div>
                <div className="border border-slate-300 px-10 py-8 rounded-lg">
                    <div>
                        <div>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
