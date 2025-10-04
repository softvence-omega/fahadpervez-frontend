import AdminSidebar from "@/components/AdminDashboard/reuseable/AdminSidebar";
import DashboardHeader from "@/components/AdminDashboard/reuseable/DashboardHeader";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  const hideSidebar =
    pathname.startsWith("/admin/student-profile/") ||
    pathname.startsWith("/admin/professional-profile/") ||
    pathname.startsWith("/admin/mentor-profile/");

  return (
    <div>
      <main>
        <div className="min-h-screen bg-slate">
          {/* Header */}
          <div className="flex items-center justify-between bg-white">
            <DashboardHeader />

            {/* Mobile sidebar button */}
            <div className="md:hidden pr-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger className="cursor-pointer" asChild>
                  <button className="p-2 rounded-md border border-slate-200">
                    <Menu className="h-6 w-6 cursor-pointer" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <AdminSidebar
                    sidebarOpen={true}
                    onLinkClick={() => setSidebarOpen(false)}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Layout Body */}
          <div className="flex items-start px-4.5 pt-6 gap-6">
            {/* Desktop sidebar */}
            {!hideSidebar && (
              <div className="hidden md:block">
                <AdminSidebar sidebarOpen={true} />
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1">
              {hideSidebar ? (
                <CommonWrapper>
                  <Outlet />
                </CommonWrapper>
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
