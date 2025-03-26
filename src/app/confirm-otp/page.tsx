"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useOtpVerifyMutation, useResendOtpMutation } from "../api/apiSlice";

const OTPPage = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState<number>(600); // 10 minutes in seconds
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otpVerify, { isSuccess, isError, isLoading }] = useOtpVerifyMutation();

  const [resendOtp, { isSuccess: resendSuccess }] = useResendOtpMutation();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!email) {
      toast.error("Email is required");
      return;
    }
    if (!enteredOtp) {
      toast.error("OTP is required");
      return;
    }
    try {
      await otpVerify({ email, otp: enteredOtp });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP");
    }
  };

  const handleResendOTP = async () => {
    setTimer(600);
    setIsResendDisabled(true);
    if (!email) {
      toast.error("Email is required");
      return;
    }
    try {
      await resendOtp({ email });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP");
    }
  };
  useEffect(() => {
    if (resendSuccess) {
      toast.success("OTP resent successfully!");
    }
  }, [resendSuccess]);
  // Countdown timer logic
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current!); // Clear interval when timer reaches 0
          setIsResendDisabled(false); // Enable resend button
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // Format timer into minutes and seconds
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("OTP verified successfully!");
      router.push("/");
    }
  }, [isSuccess, router]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-black underline">
          Verify OTP
        </h1>
        <p className="text-gray-600 mb-6 text-center ">
          We have sent a 6-digit OTP to your registered email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4 mb-6">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !otp.length}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading && <span className="loader"></span>}
              <span>{isLoading ? "Verifying..." : "Verify OTP"}</span>
            </div>
          </button>
        </form>
        <p className="text-gray-600 mt-6 text-center">
          Didn&apos;t receive OTP?{" "}
          <button
            onClick={handleResendOTP}
            disabled={isResendDisabled}
            className={`text-blue-600 hover:underline ${
              isResendDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Resend {isResendDisabled && `(${formatTime(timer)})`}
          </button>
        </p>
        {isError && <p className="text-red-500 mt-2">Failed to verify OTP</p>}
      </div>
    </div>
  );
};

const OtpPageWithSuspense = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OTPPage />
    </Suspense>
  );
};

export default OtpPageWithSuspense;
