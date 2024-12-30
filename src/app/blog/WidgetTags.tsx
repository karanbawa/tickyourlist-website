"use client"

import React, { FC } from "react";
import { TaxonomyType } from "@/data/types";
import WidgetHeading1 from "./WidgetHeading1";
import Tag from "@/shared/Tag";
import { DEMO_TAGS } from "@/data/taxonomies";
import { Route } from "next";
import { usePathname } from "next/navigation";

export interface WidgetTagsProps {
  className?: string;
  tags?: TaxonomyType[];
}
const tagsDemo = DEMO_TAGS.filter((_, i) => i > 5);
// const tagsDemo = 

const WidgetTags: FC<WidgetTagsProps> = ({ 
  className = "bg-neutral-100 dark:bg-neutral-800",
  tags = tagsDemo,
}) => {

  const thisPathname = usePathname();

  const tagsData = tags?.map(tag => ({
    id: tag.id,
    name: tag.name,
    href: `${thisPathname}/tag/${tag?.slug}` as Route,
    count: tag.count,
    taxonomy: "tag" as const, // Fix: explicitly type as "tag"
    color: "indigo" as TwMainColor, // Fix: explicitly type as TwMainColor
    description: tag.description,
    // Add other required TaxonomyType fields
    thumbnail: tag.thumbnail,
    desc: tag.desc,
    listingType: tag.listingType,
    slug: tag.slug
  })) as TaxonomyType[]; // Add type assertion to ensure it matches TaxonomyType

  console.log("tagsData ", tagsData);

  return (
    <div className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}>
      <WidgetHeading1
        title="🏷 Discover more tags"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tagsData.map((tag) => (
          <Tag className="mr-2 mb-2" key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  );
};

export default WidgetTags;
