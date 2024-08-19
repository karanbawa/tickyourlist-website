// components/HandleImageClick.tsx
'use client';

import { FC, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Route } from 'next';

interface HandleImageClickProps {
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'button';
  type?: 'button' | 'submit' | 'reset';
}

const HandleImageClick: FC<HandleImageClickProps> = ({
  children,
  className,
  tag: Tag = 'div',
  type = 'button',
}) => {
  const router = useRouter();
  const thisPathname = usePathname();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  return (
    <Tag
      onClick={handleOpenModalImageGallery}
      className={`cursor-pointer ${className}`}
      {...(Tag === 'button' ? { type } : {})}
    >
      {children}
    </Tag>
  );
};

export default HandleImageClick;
