/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import CommonWrapper from "@/common/CommonWrapper";
import PricingCard from "@/components/PricingCard";
import { useGetAllPricingQuery } from "@/store/features/pricing/pricing.api";
import GlobalLoader2 from "@/common/GlobalLoader2";
// import { useGetAllPricingQuery } from "@/store/features/pricing/pricing.api";

const Pricing = () => {
  const [activeCycle, setActiveCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const { data: pricingData, isLoading: pricingLoading } =
    useGetAllPricingQuery({});
  const plans = pricingData?.data || [];

  /* --------------------------------
      Filter plans by billing cycle
  --------------------------------- */
  const filteredPlans = useMemo(() => {
    return plans.filter(
      (plan: any) => plan.billingCycle.toLowerCase() === activeCycle
    );
  }, [plans, activeCycle]);

  return (
    <div className="bg-white pb-10">
      <CommonWrapper>
        <div className="text-center pt-20">
          <h2 className="text-7xl text-slate-700 font-semibold font-bricolage mb-2">
            Upgrade your Plan
          </h2>

          <p className="text-2xl text-slate-700 font-semibold mb-6">
            Unlock advanced features and get more powerful tools.
          </p>

          {/* ------------------
              Monthly / Yearly Tab
          ------------------- */}
          <div className="inline-flex border border-slate-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveCycle("monthly")}
              className={`px-6 py-2 text-sm font-medium ${
                activeCycle === "monthly"
                  ? "bg-blue-main text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveCycle("yearly")}
              className={`px-6 py-2 text-sm font-medium ${
                activeCycle === "yearly"
                  ? "bg-blue-main text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* ------------------
            Pricing cards
        ------------------- */}
        {pricingLoading ? (
          <GlobalLoader2 />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9 items-center justify-center mt-24 p-4">
            {filteredPlans.map((plan: any) => (
              <PricingCard
                key={plan._id}
                title={plan.planName}
                price={`$${plan.price}`}
                period={`/per ${plan.billingCycle.toLowerCase()}`}
                description={plan.description}
                features={plan.planFeatures.map(
                  (f: any) => `${f.featureName} (${f.featureLimit})`
                )}
                buttonText="Upgrade Your plan"
              />
            ))}
          </div>
        )}
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
