import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import signupImage from "../../assets/signUp/signUpImage.png";
import logo from "../../assets/signUp/logo.png";

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type OtpFormInputs = z.infer<typeof otpSchema>;

export default function VerificationOTP() {
  const {
    // register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OtpFormInputs>({
    resolver: zodResolver(otpSchema),
  });

  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // Handle OTP box change
  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setValue("otp", newOtp.join(""));

      // Auto-focus next box
      if (value && index < 5) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  // Form submit
  const onSubmit = (data: OtpFormInputs) => {
    console.log("OTP Submitted:", data.otp);

    // 👉 API call here
    if (data.otp === "123456") {
      alert("OTP Verified Successfully ✅");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP ❌");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (unchanged) */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-6 left-6">
          <img src={logo} alt="Logo" />
        </div>
        <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg text-sm max-w-sm">
          <p className="italic text-gray-700">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 font-semibold text-gray-900">Sofia Davis</p>
        </div>
      </div>

      {/* Right Side (OTP Verification) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-[400px] text-center border border-[#E2E8F0] p-8 rounded-[8px]">
          <h2 className="text-2xl font-semibold text-[#020617]">Verification</h2>
          <p className="w-[325px] mx-auto text-sm font-normal text-[#71717A] leading-5 mb-6 mt-2">
            We’ve sent a 6-digit code to <b>test@test12309u.com</b>. Enter it below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-10 h-12 text-center border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-red-500 text-sm">{errors.otp.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-gray-800"
            >
              Verify OTP
            </button>
          </form>

          {/* Back + Sign up */}
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#0F172A] font-medium mt-6 mb-8 hover:underline flex items-center gap-1 mx-auto"
          >
            ← Back
          </button>

          <p className="text-sm text-center font-medium text-[#020617] mt-2">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
