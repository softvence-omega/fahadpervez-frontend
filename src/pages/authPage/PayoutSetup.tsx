import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PayoutSetupData, payoutSetupSchema } from "./schemas";

interface Props {
  onNext: (data: PayoutSetupData) => void;
  onBack: () => void;
  onSkip?: () => void;
  defaultValues?: Partial<PayoutSetupData>;
}

export default function PayoutSetup({
  onNext,
  onBack,
  onSkip,
  defaultValues,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PayoutSetupData>({
    resolver: zodResolver(payoutSetupSchema),
    defaultValues: {
      paymentMethod: "",
      paymentDetails: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) reset({ ...defaultValues });
  }, [defaultValues, reset]);

  const onSubmit = (data: PayoutSetupData) => {
    onNext(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-bricolage text-3xl font-semibold">Payout Setup</h2>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            className="text-blue-500 underline hover:text-blue-600 font-medium"
          >
            Skip
          </button>
        )}
      </div>
      <p className="mb-6">Set up your payout method</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-slate-300 rounded-[12px] bg-white p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Method
          </label>
          <select
            {...register("paymentMethod")}
            className="w-full p-3 border border-slate-300 rounded-md"
          >
            <option value="">Select Payment Method</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
            <option value="stripe">Stripe</option>
          </select>
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Payment Details
          </label>
          <input
            {...register("paymentDetails")}
            placeholder="Enter payment details (e.g., PayPal email or bank account)"
            className="w-full p-3 border border-slate-300 rounded-md"
          />
          {errors.paymentDetails && (
            <p className="text-red-500 text-sm mt-1">
              {errors.paymentDetails.message}
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 border rounded"
          >
            Back
          </button>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-main text-white rounded"
            >
              {isSubmitting ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
