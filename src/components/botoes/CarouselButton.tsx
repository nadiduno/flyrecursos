import React from 'react';
import { ButtonApp } from './ButtonApp';

interface CarouselButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  size?: number;
}

export function CarouselButton({ onClick, children, size = 24 }: CarouselButtonProps) {
  return (
    <ButtonApp
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 bg-gray-400 text-white rounded-full w-[34px] h-[34px] md:w-[5.75rem] md:h-[5.75rem] flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300"
      size={size}
    >
      {children}
    </ButtonApp>
  );
}