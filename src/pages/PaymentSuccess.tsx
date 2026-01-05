/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentMutation } from "@/store/features/payment/payment.api";
import { useLazyGetMeQuery } from "@/store/features/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser, selectToken } from "@/store/features/auth/auth.slice";
import GlobalLoader2 from "@/common/GlobalLoader2";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import CommonWrapper from "@/common/CommonWrapper";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const resultIndicator = searchParams.get("resultIndicator");

  // Try getting paymentId from URL first, then sessionStorage
  const urlPaymentId = searchParams.get("paymentId");
  const storedPaymentId = sessionStorage.getItem("pendingPaymentId");
  const paymentId = urlPaymentId || storedPaymentId || "";

  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const hasVerified = useRef(false);
  const [triggerGetMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    const verify = async () => {
      // Prevent double invocation
      if (hasVerified.current) return;

      if (!resultIndicator) {
        setStatus("failed");
        setMessage("Invalid payment response.");
        return;
      }

      hasVerified.current = true;

      try {
        const response = await verifyPayment({
          paymentId: paymentId || resultIndicator, // Fallback if paymentId specific param isn't there
          resultIndicator,
        }).unwrap();

        // Clear stored paymentId
        sessionStorage.removeItem("pendingPaymentId");

        if (response.success) {
          // Refresh user data
          const userResponse = await triggerGetMe().unwrap();
          if (userResponse.success && userResponse.data) {
            // Dispatch to Redux to update global state
            const { account, profile } = userResponse.data;
            // We reuse the current access token
            dispatch(
              setUser({ user: { account, profile }, accessToken: token })
            );
            // Ensure structure matches
          }

          setStatus("success");
          setMessage("Your plan has been upgraded successfully.");
        } else {
          setStatus("failed");
          setMessage(response.message || "Payment verification failed.");
        }
      } catch (error: any) {
        setStatus("failed");
        setMessage(error?.data?.message || "Payment verification error.");
      }
    };

    verify();
  }, [resultIndicator, paymentId, verifyPayment, triggerGetMe, dispatch]);

  if (isLoading || status === "loading") {
    return <GlobalLoader2 />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <CommonWrapper>
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
          {status === "success" ? (
            <div className="space-y-6">
              <div className="flex justify-center">
                <CheckCircle className="w-20 h-20 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Payment Successful!
              </h2>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-left">
                <p className="font-semibold text-green-800 mb-2">
                  Account Updated:
                </p>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Subscription is now active</li>
                  {/* <li>AI Credits: 10 added</li> */}
                </ul>
              </div>
              <p className="text-gray-600 text-lg">{message}</p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl"
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <XCircle className="w-20 h-20 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Payment Failed
              </h2>
              <p className="text-gray-600 text-lg">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/pricing")} // Or wherever pricing is
                  variant="outline"
                  className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-6 text-lg rounded-xl"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="ghost"
                  className="w-full text-gray-500 hover:text-gray-700"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </CommonWrapper>
    </div>
  );
};

export default PaymentSuccess;
