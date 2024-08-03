import React from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import Badge from "@/shared/Badge";
import Image from "next/image";
import travelhero2Image from "@/images/company/cancellationpolicy.png";
import Link from "next/link";
import { Route } from "@/routers/types";
import Head from "next/head";

const Page = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <h1
            className="text-neutral-900 font-semibold text-5xl md:text-5xl md:!leading-[120%] lg:text-5xl dark:text-neutral-100 max-w-4xl"
            title="Cancellation & Refund Policy"
          >
            Cancellation & Refund Policy
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
          <li>Cancellation:</li>
          <ul>
            <li>
              TickYourList understands that plans may change. If you need to cancel your booking, simply notify us within the specified cancellation period for a hassle-free process.
            </li>
            <li>
              Cancellation periods may vary depending on the activity booked. Please refer to your booking confirmation for details.
            </li>
            <li>To cancel, contact our customer support team or follow the cancellation instructions provided in your booking confirmation.</li>
          </ul>
          <li>
            Refund:
            <ul>
              <li>
                TickYourList offers refunds for eligible cancellations within the designated cancellation period.
              </li>
              <li>
                Refund eligibility and processing times may vary depending on the activity and provider. Please refer to your booking confirmation for specific refund policies.
              </li>
              <li>Refunds will be issued to the original payment method used for booking.</li>
              <li>{`Processing fees or non-refundable portions may apply as per the activity provider's terms and conditions.`}</li>
              <li>For any questions or assistance regarding refunds, feel free to reach out to our customer support team.</li>
            </ul>
          </li>
          <li>
            Note:
            <ul>
              <li>
                Non-refundable tickets or activities with special cancellation policies will be clearly indicated at the time of booking.
              </li>
              <li>
                TickYourList reserves the right to modify or update the cancellation and refund policy as necessary. Any changes will be communicated promptly to customers.
              </li>
            </ul>
          </li>
        </ol>
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
        <title>Cancellation & Refund Policy | TickYourList</title>
        <meta
          name="description"
          content="Learn about the Cancellation & Refund Policy of TickYourList. Find details on how to cancel your booking and the eligibility for refunds."
        />
        <meta name="keywords" content="Cancellation Policy, Refund Policy, TickYourList, Booking Cancellation, Refund Eligibility" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.tickyourlist.com/cancellation-and-refund-policy" />
      </Head>
      {renderHeader()}
      <div className="container my-10 sm:my-12">
        <Image className="w-full rounded-xl" src={travelhero2Image} alt="Cancellation & Refund Policy" />
      </div>

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
      </div>
      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
        <div className="container">
          <h2 className="text-3xl font-semibold">New blogs</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
