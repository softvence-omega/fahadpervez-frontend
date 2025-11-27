import CommonSpace from "@/common/space/CommonSpace";
import { useState } from "react";
import Tabs from "../reuseable/Tabs";
import PlanOverviewTable from "./PlanOverviewTable";
import PlanSubscriptionTable, {
  SubscriptionData,
} from "./PlanSubscriptionTable";
import { subscriptionData } from "./planData";
const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Subscription", value: "subscription" },
];
const PlanTable = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [subscription, setSubscription] =
    useState<SubscriptionData[]>(subscriptionData);

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
        <div>{activeTab === "overview" && <PlanOverviewTable />}</div>
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
