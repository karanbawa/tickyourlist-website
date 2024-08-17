import React, { FC, Suspense } from "react";
import Link from "next/link";
import { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/resetPasswordForm";

export interface PageResetPasswordProps {}

export const metadata: Metadata = {
  title: "Tickyourlist: Reset Password",
  description: "Enter your new password to reset your Tickyourlist account password.",
  keywords: "Reset Password, Tickyourlist, Update Password, Security",
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

const PageResetPassword: FC<PageResetPasswordProps> = ({}) => {
  return (
    <div className={`nc-PageResetPassword`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Reset Password
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <Suspense fallback={<div>Loading form...</div>}>
            <ResetPasswordForm />
          </Suspense>

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

export default PageResetPassword;
