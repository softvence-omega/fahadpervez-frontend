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

  // --- CAPTURE PARAMS ONCE INTO CONSTANTS ---
  const urlOrderId = searchParams.get("orderId")?.trim();
  const urlPaymentId = searchParams.get("paymentId")?.trim();
  const urlType = searchParams.get("type")?.trim();

  // Local state to hold the "Locked" values for verification
  const [verificationData, setVerificationData] = useState<{
    id: string;
    type: "session" | "plan";
  } | null>(null);

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  // REDUX & API
  const [verifyPayment, { isLoading: isPlanVerifyLoading }] =
    useVerifyPaymentMutation();
  const [verifySession, { isLoading: isSessionVerifyLoading }] =
    useVerifySessionMutation();
  const [triggerGetMe] = useLazyGetMeQuery();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const isLoading = isPlanVerifyLoading || isSessionVerifyLoading;

  // INITIAL SETUP: Determine what we are verifying
  useEffect(() => {
    const storedPaymentId = sessionStorage.getItem("pendingPaymentId")?.trim();
    const storedType = sessionStorage.getItem("paymentType")?.trim();

    // 1. Determine Type (Priority: URL > Storage)
    const finalType =
      urlType === "mentor_session" ||
      storedType === "session" ||
      storedType === "plan_upgrade"
        ? urlType === "mentor_session" || storedType === "session"
          ? "session"
          : "plan"
        : "plan";

    // 2. Determine ID (Priority: Explicit orderId > Stored ID > paymentId param)
    const finalId = urlOrderId || storedPaymentId || urlPaymentId || "";

    console.log("DEBUG: Verification Data Preparation (ONLY paymentId)", {
      finalId,
      finalType,
      source: {
        urlOrderId,
        storedPaymentId,
        urlPaymentId,
        urlType,
        storedType,
      },
    });

    if (!finalId) {
      setStatus("failed");
      setMessage("Payment record not found (ID missing).");
    } else {
      setVerificationData({
        id: finalId,
        type: finalType,
      });
    }
  }, [urlOrderId, urlPaymentId, urlType]);

  // ACTION: Execute Verification
  useEffect(() => {
    if (!verificationData || hasVerified.current) return;

    let timeout: NodeJS.Timeout;

    const runVerify = async () => {
      hasVerified.current = true;
      const { id, type } = verificationData;

      try {
        console.log(`DEBUG: Executing Verification [${type}] with id: ${id}`);

        let response;
        if (type === "session") {
          // Sending only paymentId as requested
          response = await verifySession({ paymentId: id }).unwrap();
        } else {
          // Sending only paymentId as requested
          response = await verifyPayment({ paymentId: id }).unwrap();
        }

        // CLEAR STORAGE after first attempt
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
            type === "session"
              ? "Your session booking is confirmed!"
              : "Your plan has been upgraded!"
          );
          timeout = setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
          setMessage(response.message || "Verification failed on our servers.");
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        setStatus("failed");
        setMessage(
          error?.data?.message ||
            error?.message ||
            "Internal verification system error."
        );
      }
    };

    runVerify();
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    verificationData,
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
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 p-4">
      <CommonWrapper>
        <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl text-center border border-gray-100">
          {status === "success" ? (
            <div className="space-y-6">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto animate-bounce" />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Success!
              </h2>
              <p className="text-gray-600 text-lg">{message}</p>
              <div className="py-2 px-4 bg-blue-50 text-blue-700 text-sm rounded-full inline-block">
                Redirecting to dashboard...
              </div>
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl py-7 text-xl font-bold transition-all shadow-lg hover:shadow-blue-200"
              >
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <XCircle
                className="w-24 h-24 text-red-500 mx-auto"
                strokeWidth={2.5}
              />
              <h2 className="text-3xl font-extrabold text-gray-900">
                Problem Found
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{message}</p>
              <div className="pt-4 space-y-4">
                <Button
                  onClick={() =>
                    navigate(
                      verificationData?.type === "session"
                        ? "/dashboard/mentorship"
                        : "/pricing"
                    )
                  }
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-2xl py-6 text-lg font-bold transition-colors"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-gray-600 text-base"
                >
                  Return to Dashboard
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
