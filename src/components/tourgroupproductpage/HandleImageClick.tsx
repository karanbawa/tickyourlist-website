'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Route } from 'next';
import { useData } from '@/context/DataContext';

interface HandleImageClickProps {
  children: ReactNode;
  className?: string;
  tag?: 'div' | 'button';
  type?: 'button' | 'submit' | 'reset';
  data?: any;
}

const HandleImageClick: FC<HandleImageClickProps> = ({
  children,
  className = '',
  tag: Tag = 'div',
  type = 'button',
  data = {}
}) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const { saveData } = useData();
  const searchParams = useSearchParams();

  const handleOpenModalImageGallery = () => {
    router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
  };

  useEffect(() => {
    const modalParam = searchParams.get('modal');
    if (modalParam === 'PHOTO_TOUR_SCROLLABLE') {
      console.log('savedata ', saveData);
      saveData(data);
    }
  }, [data, saveData]);

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
