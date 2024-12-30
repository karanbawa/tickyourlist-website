import React, { Suspense } from "react";
import Avatar from "@/shared/Avatar";
import Badge from "@/shared/Badge";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import Comment from "@/shared/Comment";
import SocialsList from "@/shared/SocialsList";
import Textarea from "@/shared/Textarea";
import Image from "next/image";

// TypeScript interfaces for the WordPress API response
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ACF {
  reading_time: string;
  subtitle: string;
  featured_image_caption: string;
  author_bio: string;
  cityCode: string;
  countryCode: string;
  featured_post: boolean;
}

interface Author {
  name: string;
  avatar: string;
}

interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  categories: Category[];
  acf: ACF;
  date: string;
  modified: string;
  author: Author;
}

async function getPost(slug: string): Promise<WordPressPost> {
  const baseUrl = 'https://limegreen-goat-705421.hostingersite.com/wp-json/tyl/v1/post';
  const res = await fetch(`${baseUrl}/${slug}`, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt.replace(/&hellip;/g, '...'),
    openGraph: {
      images: [post.featured_image],
    },
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  console.log("postcheck ", post);

  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          {post.categories.map((category) => (
            <Badge 
              key={category.id}
              href={`/category/${category.slug}`}
              color="purple"
              name={category.name}
            />
          ))}
          <h1 className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl">
            {post.title}
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            {post.excerpt.replace(/&hellip;/g, '...')}
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              {/* <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11"
                imgUrl={{
                  src: post?.author?.avatar,
                  width: 10,
                  height: 10
                }}
                // width={10}
              /> */}
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="block font-semibold">
                    {post.author.name}
                  </span>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {post.acf.reading_time && (
                    <>
                      <span className="mx-2 font-semibold">·</span>
                      <span className="text-neutral-700 dark:text-neutral-300">
                        {post.acf.reading_time} min read
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark
          prose-headings:font-semibold 
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-base prose-p:leading-7
          prose-a:text-primary-600 prose-a:no-underline hover:prose-a:text-primary-700
          prose-img:rounded-xl prose-img:shadow-lg
          prose-figure:my-8
          prose-ol:list-decimal prose-ol:pl-6
          prose-ul:list-disc prose-ul:pl-6"
        dangerouslySetInnerHTML={{ 
          __html: post.content.replace(
            /<figure class="wp-block-image[^>]*>/g,
            '<figure class="wp-block-image my-8">'
          )
        }}
      />
    );
  };

  const renderCommentForm = () => {
    return (
      <div className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Leave a Comment
        </h3>
        <form className="nc-SingleCommentForm mt-5">
          <Textarea placeholder="Write your comment..." />
          <div className="mt-2 space-x-3">
            <ButtonPrimary>Submit</ButtonPrimary>
            <ButtonSecondary>Cancel</ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="nc-PageSingle pt-8 lg:pt-16">
        {renderHeader()}
        {post.featured_image && (
          <div className="container my-10 sm:my-12">
            <div className="aspect-w-16 aspect-h-9 relative">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                className="object-cover rounded-xl"
                priority
              />
              {post.acf.featured_image_caption && (
                <figcaption className="mt-2 text-center text-sm text-gray-500">
                  {post.acf.featured_image_caption}
                </figcaption>
              )}
            </div>
          </div>
        )}

        <div className="nc-SingleContent container space-y-10">
          {renderContent()}
          
          {/* Location info if available */}
          {(post.acf.cityCode || post.acf.countryCode) && (
            <div className="max-w-screen-md mx-auto">
              <div className="flex items-center text-sm text-neutral-500">
                <span className="mr-2">Location:</span>
                {post.acf.cityCode && (
                  <span className="capitalize">{post.acf.cityCode}</span>
                )}
                {post.acf.countryCode && (
                  <>
                    <span className="mx-1">·</span>
                    <span className="uppercase">{post.acf.countryCode}</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
          {renderCommentForm()}
        </div>
      </div>
    </Suspense>
  );
};

export default Page;