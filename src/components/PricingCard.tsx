import { Check } from "lucide-react";

const PricingCard = ({
  title = "Premium",
  price = "$9.99",
  period = "/per month",
  description = "Best for professional freelancers and small teams.",
  features = [],
  buttonText = "Upgrade Your plan",
}) => {
  return (
    <div className="w-full max-w-md mx-auto border border-gray-200 rounded-2xl shadow-sm bg-white p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div>
        <h3 className="text-gray-900 font-semibold text-lg mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-900">
          {price}
          <span className="text-base font-normal text-gray-500 ml-1">
            {period}
          </span>
        </p>
        <p className="text-gray-500 text-sm mt-1">{description}</p>

        <hr className="my-4 border-gray-200" />

        {/* Features */}
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-black font-medium"
            >
              <Check className="w-6 h-6 text-green-600 mt-[2px]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <button className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2.5 rounded-md font-medium hover:from-blue-700 hover:to-blue-600 transition-all duration-200">
        {buttonText}
      </button>
    </div>
  );
};

export default PricingCard;
