import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../assets/signUp/signUpImage.png";
import logo from "../../assets/signUp/logo.png"

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  // Email signup
  const onSubmit = (data: LoginFormInputs) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    console.log("Signup Data:", Object.fromEntries(formData));
    // navigate("/login");
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
        <div className="w-full max-w-[450px] border border-[#E2E8F0] p-8 rounded-[8px]">
          <h2 className="text-2xl font-semibold text-[#09090B]">Login</h2>
          <p className="text-sm font-normal text-[#64748B] leading-5 mb-6 mt-2">Enter your email below to login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2 mt-4">Email</h3>
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors?.email?.message}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-[#020617] font-medium leading-5 mb-2 mt-4">Password</h3>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#020617] font-medium mb-2 mt-4 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
              <input
                type="password"
                placeholder=""
                {...register("password")}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors?.password?.message}</p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0F172A] text-sm font-medium text-[#FAFAFA] p-3 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>


          {/* Google button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center text-sm text-[#3F3F46] font-medium border border-[#D2D6DB] p-[8px] rounded-lg hover:bg-gray-100 mt-2"
          >
            <FcGoogle className="mr-2 text-xl" />
            Google
          </button>

          <p className="text-sm text-center text-[#020617] mt-4">
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
};

export default Login;
