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
          avatar: {
            src: post?.author?.avatar,
            width: 10,
            height: 10
          },
          href: `/${post?.slug}` as Route,
          displayName: 'TickYourList',

      },
      date: formatDate(post?.date),
      href: `/${post?.slug}` as Route,
      categories: post?.categories,
      title: post?.title,
      featuredImage: post?.featured_image,
      desc: post?.content,
      commentCount: 0,
      viewdCount: 1,
      readingTime: 1,
      slug: post?.slug as Route,
      description: post?.content
  }))

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
