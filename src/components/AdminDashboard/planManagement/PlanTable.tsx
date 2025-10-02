import CommonSpace from "@/common/space/CommonSpace";
import { useState } from "react";
import Tabs from "../reuseable/Tabs";
import PlanOverviewTable from "./PlanOverviewTable";
import PlanSubscriptionTable, {
  SubscriptionData,
} from "./PlanSubscriptionTable";
import { overviewData, OverviewData, subscriptionData } from "./planData";
const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Subscription", value: "subscription" },
];
const PlanTable = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [overview, setOverview] = useState<OverviewData[]>(overviewData);
  const [subscription, setSubscription] =
    useState<SubscriptionData[]>(subscriptionData);

  //overview table
  const handleToggleAvailability = (provider: OverviewData) => {
    setOverview((prev) =>
      prev.map((p) =>
        p.id === provider.id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  const handleDelete = (provider: OverviewData) => {
    setOverview((prev) => prev.filter((p) => p.id !== provider.id));
  };

  //subscription table
  const subscriptionDelete = (subscription: SubscriptionData) => {
    setSubscription((prev) => prev.filter((p) => p.id !== subscription.id));
  };
  return (
    <div>
      <div>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>
      <CommonSpace>
        <div>
          {activeTab === "overview" && (
            <PlanOverviewTable
              overview={overview}
              onToggleAvailability={handleToggleAvailability}
              onDelete={handleDelete}
            />
          )}
        </div>
        <div>
          {activeTab === "subscription" && (
            <PlanSubscriptionTable
              subscription={subscription}
              onDelete={subscriptionDelete}
            />
          )}
        </div>
      </CommonSpace>
    </div>
  );
};

export default PlanTable;
