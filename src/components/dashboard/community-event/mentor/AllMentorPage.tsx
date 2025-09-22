import Breadcrumb from "@/components/reusable/CommonBreadcrumb";
import { BreadcrumbItem } from "../../gamified-learning/types";

export default function AllMentorPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Dashboard", link: "/dashboard" },
    { name: "All Communities", link: "/dashboard/all-communities" },
    { name: "Create New Discussion", link: "/dashboard/create-new-discussion" },
  ];
  return (
    <div className="my-6">
      <Breadcrumb breadcrumbs={breadcrumbs} />
    </div>
  );
}
