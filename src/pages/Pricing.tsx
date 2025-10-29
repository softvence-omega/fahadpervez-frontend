import CommonWrapper from "@/common/CommonWrapper";
import PricingCard from "@/components/PricingCard";

const Pricing = () => {
  const premiumFeatures = [
    "Full MCQ Bank (with filtering)",
    "Unlimited Flashcards",
    "Unlimited Clinical Case Library",
    "Weekly Mini Cases",
    "Download Notes (PDF)",
    "Weekly Study Plan",
    "Social Feed: post, like, comment",
    "Limited MCQ generation & AI Flashcard (10/month)",
  ];

  return (
    <div className="bg-white pb-10">
      <CommonWrapper>
        <div className=" text-center pt-20">
          <h2 className="text-7xl text-slate-700 font-semibold font-bricolage mb-2">
            Upgrade your Plan
          </h2>
          <p className="text-2xl text-slate-700 font-semibold">
            Unlock advanced features and get more powerful tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-9 items-center justify-center mt-24 p-4">
          <PricingCard
            title="Premium"
            price="$9.99"
            period="/per month"
            description="Best for professional freelancers and small teams."
            features={premiumFeatures as unknown as never[]}
            buttonText="Upgrade Your plan"
          />
          <PricingCard
            title="Premium"
            price="$9.99"
            period="/per month"
            description="Best for professional freelancers and small teams."
            features={premiumFeatures as unknown as never[]}
            buttonText="Upgrade Your plan"
          />
          <PricingCard
            title="Premium"
            price="$9.99"
            period="/per month"
            description="Best for professional freelancers and small teams."
            features={premiumFeatures as unknown as never[]}
            buttonText="Upgrade Your plan"
          />
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Pricing;
