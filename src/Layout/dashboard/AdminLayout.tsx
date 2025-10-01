import AdminSidebar from "@/components/AdminDashboard/reuseable/AdminSidebar";
import DashboardHeader from "@/components/AdminDashboard/reuseable/DashboardHeader";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <main>
        <div className="min-h-screen bg-slate ">
          <div className="flex items-center justify-between bg-white">
            <DashboardHeader />

            <div className="md:hidden pr-4">
              <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                <SheetTrigger className=" cursor-pointer" asChild>
                  <button className="p-2 rounded-md border border-slate-200 ">
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

          <div className="flex items-start px-4.5 pt-6 gap-6">
            <div className="hidden md:block">
              <AdminSidebar sidebarOpen={true} />
            </div>

            <main className="flex-1 ">
              <Outlet />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
