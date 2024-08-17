import React, { FC } from "react";
import Link from "next/link";
import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgotPasswordForm";

export interface PageForgotPasswordProps {}

export const metadata: Metadata = {
  title: "Tickyourlist: Forgot Password",
  description: "Enter your email address to receive a verification link for resetting your Tickyourlist account password.",
  keywords: "Forgot Password, Tickyourlist, Reset Password, Email Verification"
};

export const viewport = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

const PageForgotPassword: FC<PageForgotPasswordProps> = ({}) => {
  return (
    <div className={`nc-PageForgotPassword`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <ForgotPasswordForm />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Remember your password? {` `}
            <Link href="/login" className="font-semibold underline">
              Login here
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageForgotPassword;