import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../assets/signUp/signUpImage.png";
import logo from "../../assets/signUp/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const signupSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [preview, setPreview] = useState<string | null>(null);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  // Email signup
  const onSubmit = (data: SignupFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    // formData.append("password", data.password);

    console.log("Signup Data:", Object.fromEntries(formData));
    navigate("/verification-otp");
  };

  // Google signup
  const handleGoogleSignup = () => {
    console.log("Google signup triggered");
    // 👉 Later: integrate Firebase/Auth0/NextAuth/etc.
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative items-center justify-center">
        <img
          src={signupImage}
          alt="Signup Illustration"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-6 left-6">
          {/* <h1 className="text-blue-600 font-bold text-lg">
            Medical Student Hub
          </h1> */}
          <img src={logo} alt="" />
        </div>
        <div className="absolute bottom-6 left-6 bg-white/80 p-4 rounded-lg text-sm max-w-sm">
          <p className="italic text-gray-700">
            “This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <p className="mt-2 font-semibold text-gray-900">Sofia Davis</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-[#09090B]">
            Create an account
          </h2>
          <p className="text-sm font-normal text-[#71717A] leading-5 mb-6 mt-2">
            Enter your email below to create your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={`${showPassword ? "password" : "text"}`}
                placeholder="*****"
                {...register("password")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <div onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <Eye className="absolute top-3 right-2" />
                ) : (
                  <EyeOff className="absolute top-3 right-2" />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              className="w-full bg-blue-main text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-blue-600 cursor-pointer"
            >
              Sign up with Email
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-xs text-[#71717A] font-normal">
              OR CONTINUE WITH
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center text-sm text-[#3F3F46] font-medium border border-[#D2D6DB] p-[8px] rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <FcGoogle className="mr-2 text-xl" />
            Google
          </button>

          {/* Terms + Sign in */}
          <p className="text-xs text-[#71717A] font-normal mt-6 px-8 text-center">
            By clicking continue, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
            .
          </p>
          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
