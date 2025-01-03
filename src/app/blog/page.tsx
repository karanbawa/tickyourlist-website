import React from "react";
import { DEMO_POSTS } from "@/data/posts";
import SectionAds from "./SectionAds";
import SectionMagazine5 from "./SectionMagazine5";
import SectionLatestPosts from "./SectionLatestPosts";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SectionHero2 from "../(server-components)/SectionHero2";
import BlogHero from "../(server-components)/BlogHero";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import NewsTicker from "./NewsTicker";

const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);


async function fetchTravelCities() {
  const response = await fetch(`${process.env.BASE_URL}/v1/tyltravelcity/get/travelcity/public/submitted/all?websiteId=${process.env.WEBSITE_ID}`, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj' 

    },
    next: { revalidate: 10 }
  });

  if (!response.ok) {
    throw notFound();
  }

  return response.json();
}

async function fetchAllTags() {
  const response = await fetch(`https://limegreen-goat-705421.hostingersite.com/wp-json/tyl/v1/tags`, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'

    },
    next: { revalidate: 10 }
  });

  if (!response.ok) {
    throw notFound();
  }

  return response.json();
}

async function fetchAllLatestPosts() {
  const response = await fetch(`https://limegreen-goat-705421.hostingersite.com/wp-json/tyl/v1/posts?page=1`, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'

    },
    next: { revalidate: 10 }
  });

  if (!response.ok) {
    throw notFound();
  }

  return response.json();
}

async function fetchAllCategoriesStats() {
  const response = await fetch(`https://limegreen-goat-705421.hostingersite.com/wp-json/tyl/v1/categories/stats`, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'x-api-key': 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'

    },
    next: { revalidate: 10 }
  });

  if (!response.ok) {
    throw notFound();
  }

  return response.json();
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog - Travel Stories and Guides",
    description: "Discover travel stories, guides, and tips from around the world",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    },
    openGraph: {
      title: "Blog - Travel Stories and Guides",
      description: "Discover travel stories, guides, and tips from around the world",
      url: 'https://www.tickyourlist.com/blog',
      siteName: 'Your Travel Blog',
      type: 'website'
    }
  };
}

const BlogPage = async () => {
  const cookieStore = cookies();
  
  const travelCities = await fetchTravelCities();
  const allTags = await fetchAllTags();
  const allLatestPosts = await fetchAllLatestPosts();
  const allCategories = await fetchAllCategoriesStats();

  const posts = travelCities?.data?.posts || [];
  
  // const magazinePosts = posts.filter((_, i) => i >= 0 && i < 8);

  return (
    <div className="nc-BlogPage overflow-hidden relative">
      <div className="">
        <BlogHero className="" travelCities={travelCities?.data?.travelCitiesList} />
      </div>
      <BgGlassmorphism />
      
      <div className="container relative">
        {/* <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 posts={MAGAZINE1_POSTS} />
        </div> */}

        {/* <SectionAds /> */}

        <NewsTicker posts={allLatestPosts} />
        
        <SectionLatestPosts className="py-16 lg:py-28" allTags={allTags} posts={allLatestPosts} allCategories={allCategories} />

        {/* <div className="pt-12 pb-16 lg:pb-28">
          <SectionMagazine5 posts={MAGAZINE1_POSTS} />
        </div>
         */}
        <SectionSubscribe2 className="pb-16 lg:pb-28" />
      </div>
    </div>
  );
};

export default BlogPage;