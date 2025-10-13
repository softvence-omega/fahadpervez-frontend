import CommonSpace from "@/common/space/CommonSpace";
import ActiveUserChart from "@/components/AdminDashboard/analyticAndReport/ActiveUserChart";
import AnalyticTop from "@/components/AdminDashboard/analyticAndReport/AnalyticTop";
import FeatureUsage from "@/components/AdminDashboard/analyticAndReport/FeatureUsage";
import PlatformUsageChart from "@/components/AdminDashboard/analyticAndReport/PlatformUsageChart";
import Tracking from "@/components/AdminDashboard/analyticAndReport/Tracking";

const PlatformPerformance = () => {
  return (
    <div>
      <AnalyticTop />

      <div className=" flex flex-col lg:flex-row gap-6 ">
        <PlatformUsageChart />
        <ActiveUserChart />
      </div>

      <CommonSpace>
        <FeatureUsage />
      </CommonSpace>

      <Tracking />
    </div>
  );
};

export default PlatformPerformance;
