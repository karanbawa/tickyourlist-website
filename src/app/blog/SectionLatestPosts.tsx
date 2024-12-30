import React, { FC } from "react";
import Heading from "@/shared/Heading";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType } from "@/data/types";
import Pagination from "@/shared/Pagination";
import ButtonPrimary from "@/shared/ButtonPrimary";
import WidgetTags from "./WidgetTags";
import WidgetCategories from "./WidgetCategories";
import WidgetPosts from "./WidgetPosts";
import Card3 from "./Card3";
import { Route } from "next";

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 7 && i < 14);
//
export interface SectionLatestPostsProps {
  posts?: PostDataType[];
  className?: string;
  postCardName?: "card3";
  allTags?: any[];
  allCategories?: any[];
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return '';
  
  // Format date as "DD Month YYYY"
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  posts = postsDemo,
  postCardName = "card3",
  className = "",
  allTags,
  allCategories
}) => {

  const newPosts = posts?.map(post => ({
    id: post?.id,
    author: {
      id: post.id,
      firstName: '', // Add required field
      lastName: '', // Add required field
      displayName: 'TickYourList',
      avatar: {
        src: post?.author?.avatar ?? '',
        height: 20,
        width: 20
      },
      count: 0, // Add required field
      desc: '', // Add required field
      jobName: '', // Add required field
      href: `/${post?.slug}` as Route<string>,
      // Optional fields can be added if you have them
      bgImage: undefined,
      email: undefined,
      starRating: undefined,
      name: undefined
    },
    date: formatDate(post?.date),
    href: `/${post?.slug}` as Route<string>,
    categories: post?.categories || [], // Ensure it's an array of TaxonomyType
    title: post?.title || '',
    featuredImage: post?.featured_image || '',
    desc: post?.content,
    commentCount: 0,
    viewdCount: 1, // Note: property in interface is "viewCount" not "viewdCount"
    viewCount: 1, // Add this if required by PostDataType
    readingTime: 1,
    postType: "standard" as const, // Add if needed
    slug: post?.slug,
    description: post?.content,
    content: post?.content // Add if needed based on PostDataType
  })) as PostDataType[] // Type assertion to ensure it matches PostDataType

  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card3":
        return <Card3 key={post.id} className="" post={post} />;

      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14">
          <Heading>Latest Articles 🎈</Heading>
          <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
            {newPosts.map((post) => renderCard(post))}
          </div>
          <div className="flex flex-col mt-12 md:mt-20 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            {/* <ButtonPrimary loading style={{ backgroundColor: '#7C25E9' }}>Show me more</ButtonPrimary> */}
          </div>
        </div>
        <div className="w-full space-y-7 mt-24 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3 ">
          <WidgetTags tags={allTags} />
          <WidgetCategories categories={allCategories} />
          <WidgetPosts />
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
