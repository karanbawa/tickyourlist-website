import React from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import Badge from "@/shared/Badge";
import Image from "next/image";
import travelhero2Image from "@/images/company/shipping_policy.jpg";
import Link from "next/link";
import { Route } from "@/routers/types";
import Head from "next/head";
const Page = () => {
    const renderHeader = () => {
        return (
            <header className="container rounded-xl">
                <div className="max-w-screen-md mx-auto space-y-5">
                    <h1
                        className="text-neutral-900 font-semibold text-5xl md:text-5xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl text-center"
                        title="Shipping Policy"
                    >
                        Shopping Policy
                    </h1>
                    <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                </div>
            </header>
        );
    };
    const renderContent = () => {
        return (
            <div
                id="single-entry-content"
                className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
            >
                <ol>
                    <li>General Information TickYourList (registered under SNG India) is committed to providing a seamless experience for booking travel activities, tours, and experiences. All our products are delivered digitally, ensuring immediate access to your bookings without the need for physical shipping.</li>
                    <li>
                        Digital Delivery Process
                        <ul>
                            <li><span className="font-semibold">Instant Confirmation: </span>Once you complete your booking, you will receive an instant confirmation email containing all the necessary details about your activity, including the date, time, location, and any special instructions.</li>
                            <li><span className="font-semibold">E-Tickets and Vouchers: </span>Your digital tickets or vouchers will be included in the confirmation email. These documents are required for admission to your booked activities.</li>
                        </ul>
                    </li>
                    <li>Email Delivery
                        <ul>
                            <li><span className="font-semibold">Accuracy of Information: </span>Ensure that the email address provided at the time of booking is accurate and active. All booking confirmations and digital tickets will be sent to this email address.
                                Spam and Junk Folders: If you do not see the confirmation email in your inbox, please check your spam or junk folder. To avoid this issue, add bookings@tickyourlist.com to your email contacts.</li>
                        </ul>
                    </li>
                    <li>Changes and Cancellations
                        <ul>
                            <li><span className="font-semibold">Modification Requests: </span>
                                If you need to make changes to your booking, please contact our customer service team as soon as possible. We will do our best to accommodate your request based on availability and the policies of our partners.</li>
                            <li><span className="font-semibold">Cancellation Policy: </span>Refer to our Cancellation Policy for detailed information on how to cancel your booking and any applicable fees.</li>
                        </ul>
                    </li>
                    <li>Customer Support
                        <ul>
                            <li><span className="font-semibold">24/7 Assistance: </span>
                                Our customer service team is available 24/7 to assist you with any issues or questions regarding your bookings and digital deliveries.</li>
                            <li><span className="font-semibold">Contact Us: </span>If you encounter any problems with your digital delivery, please reach out to us immediately:
                                <br /> <span className="font-semibold">Email:</span> support@tickyourlist.com
                                <br /> <span className="font-semibold">Phone:</span> +91 7982053440
                            </li>
                        </ul>
                    </li>
                    <li>Security and Privacy
                        <ul>
                            <li><span className="font-semibold">Data Protection: </span>
                                Your personal information and booking details are securely stored and protected. We use industry-standard encryption and security measures to ensure your data is safe.</li>
                            <li><span className="font-semibold">Privacy Policy: </span>For more information on how we handle your personal information, please refer to our Privacy Policy.
                            </li>
                        </ul>
                    </li>
                    <li>Digital Delivery Issues
                        <ul>
                            <li><span className="font-semibold">Non-Receipt of Email: </span>
                                If you do not receive your confirmation email within a few minutes of booking, please contact our customer service team for assistance.</li>
                            <li><span className="font-semibold">Incorrect Email Address: </span>If you entered an incorrect email address during booking, please contact us immediately to update your information and resend your confirmation email.
                            </li>
                        </ul>
                    </li>
                    <li>User Responsibility
                        <ul>
                            <li><span className="font-semibold">Document Management: </span>
                                {`It is the user's responsibility to ensure that all digital tickets and vouchers are stored safely and accessed as required for their activities.`}</li>
                            <li><span className="font-semibold">Device Compatibility: </span>Make sure your devices (smartphone, tablet, etc.) are compatible with viewing and displaying PDF documents and QR codes.
                            </li>
                        </ul>
                    </li>
                    <li>Feedback and Improvements
                        <ul>
                            <li><span className="font-semibold">Continuous Improvement: </span>
                                We value your feedback to help us improve our digital delivery processes. Please share your experiences and suggestions with our customer service team.</li>
                        </ul>
                    </li>
                </ol>
                We strive to make your travel planning and booking experience as smooth as possible. Thank you for choosing TickYourList for your travel adventures.
            </div>
        );
    };
    const renderPostRelated = (post: PostDataType) => {
        return (
            <div
                key={post.id}
                className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
            >
                <Link href={post.href as Route} />
                <Image
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    src={post.featuredImage}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    alt={post.title}
                />
                <div>
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
                </div>
                <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
                    <Badge name="Categories" />
                    <h2 className="block text-lg font-semibold text-white ">
                        <span className="line-clamp-2">{post.title}</span>
                    </h2>
                    <div className="flex">
                        <span className="block text-neutral-200 hover:text-white font-medium truncate">
                            {post.author.displayName}
                        </span>
                        <span className="mx-1.5 font-medium">·</span>
                        <span className="font-normal truncate">{post.date}</span>
                    </div>
                </div>
                <Link href={post.href as Route} />
            </div>
        );
    };
    return (
        <div className="nc-PageSingle pt-8 lg:pt-16 ">
            <Head>
                <title>Shipping Policy | TickYourList</title>
                <meta
                    name="description"
                    content="Learn about the Shipping Policy of TickYourList. Find details on how to cancel your booking and the eligibility for refunds."
                />
                <meta name="keywords" content="Cancellation Policy, Refund Policy, TickYourList, Booking Cancellation, Refund Eligibility" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://www.tickyourlist.com/shippingpolicy" />
            </Head>
            {renderHeader()}
            <div className="container my-10 sm:my-12">
                <Image className="w-full rounded-xl" src={travelhero2Image} alt="Cancellation & Refund Policy" />
            </div>
            <div className="nc-SingleContent container space-y-10">
                {renderContent()}
            </div>
            {/* <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
                <div className="container">
                    <h2 className="text-3xl font-semibold">New blogs</h2>
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                        {DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}
                    </div>
                </div>
            </div> */}
        </div>
    );
};
export default Page;