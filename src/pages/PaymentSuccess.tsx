/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyPaymentMutation } from "@/store/features/payment/payment.api";
import { useVerifySessionMutation } from "@/store/features/mentor/mentor.api";
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

  // Step 1: Detect specific Type (Priority to URL param)
  const urlType = searchParams.get("type");
  const storedType = sessionStorage.getItem("paymentType");
  const paymentType =
    urlType === "mentor_session" || storedType === "session"
      ? "session"
      : "plan";

  // Step 2: Extract Payment ID / Order ID (Priority to explicit 'orderId' param)
  const urlOrderId = searchParams.get("orderId");
  const urlPaymentId = searchParams.get("paymentId");
  const storedPaymentId = sessionStorage.getItem("pendingPaymentId");

  // Strictly prioritize IDs that look like INVOICES and are NOT equal to the indicator
  const getValidId = (id: string | null) => {
    if (!id) return null;
    if (id === resultIndicator) return null; // CRITICAL: Skip if it's just the indicator
    return id;
  };

  const paymentId =
    getValidId(urlOrderId) ||
    getValidId(storedPaymentId) ||
    getValidId(urlPaymentId) ||
    "";

  const [verifyPayment, { isLoading: isPlanVerifyLoading }] =
    useVerifyPaymentMutation();
  const [verifySession, { isLoading: isSessionVerifyLoading }] =
    useVerifySessionMutation();

  const isLoading = isPlanVerifyLoading || isSessionVerifyLoading;

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const hasVerified = useRef(false);
  const [triggerGetMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const verify = async () => {
      // Prevent double invocation
      if (hasVerified.current) return;

      console.log("DEBUG: Verification Context", {
        paymentType,
        urlType,
        storedType,
        finalPaymentId: paymentId,
        urlOrderId,
        urlPaymentId,
        storedPaymentId,
        resultIndicator,
      });

      if (!resultIndicator || !paymentId || paymentId === resultIndicator) {
        setStatus("failed");
        setMessage(
          !paymentId || paymentId === resultIndicator
            ? "Missing or invalid payment ID."
            : "Invalid payment response."
        );
        return;
      }

      hasVerified.current = true;

      try {
        let response;
        if (paymentType === "session") {
          console.log("DEBUG: Verifying Session Booking", {
            paymentId,
            resultIndicator,
          });
          response = await verifySession({
            paymentId,
            resultIndicator,
          }).unwrap();
        } else {
          console.log("DEBUG: Verifying Plan Upgrade", {
            paymentId,
            resultIndicator,
          });
          response = await verifyPayment({
            paymentId,
            resultIndicator,
          }).unwrap();
        }

        // Clear stored data
        sessionStorage.removeItem("pendingPaymentId");
        sessionStorage.removeItem("paymentType");

        if (response.success) {
          const userResponse = await triggerGetMe().unwrap();
          if (userResponse.success && userResponse.data) {
            const { account, profile } = userResponse.data;
            dispatch(
              setUser({ user: { account, profile }, accessToken: token })
            );
          }

          setStatus("success");
          setMessage(
            paymentType === "session" ? "Session booked!" : "Plan upgraded!"
          );

          timeout = setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
          setMessage(response.message || "Verification failed.");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("failed");
        setMessage(
          error?.data?.message || error?.message || "Verification error."
        );
      }
    };

    verify();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    resultIndicator,
    paymentId,
    paymentType,
    verifyPayment,
    verifySession,
    triggerGetMe,
    dispatch,
    token,
    navigate,
  ]);

  if (isLoading || status === "loading") {
    return <GlobalLoader2 />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <CommonWrapper>
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg text-center">
          {status === "success" ? (
            <div className="space-y-6">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
              <h2 className="text-3xl font-bold text-gray-900">Success!</h2>
              <p className="text-gray-600">{message}</p>
              <p className="text-sm text-gray-400 italic">
                Redirecting to dashboard...
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-blue-600 rounded-xl py-6"
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <XCircle className="w-20 h-20 text-red-500 mx-auto" />
              <h2 className="text-3xl font-bold text-gray-900">Failed</h2>
              <p className="text-gray-600">{message}</p>
              <div className="space-y-3">
                <Button
                  onClick={() =>
                    navigate(
                      paymentType === "session"
                        ? "/dashboard/mentorship"
                        : "/pricing"
                    )
                  }
                  variant="outline"
                  className="w-full py-6 rounded-xl border-2 border-blue-600 text-blue-600"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="ghost"
                  className="w-full text-gray-500"
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
