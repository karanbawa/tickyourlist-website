import React, { FC } from 'react';

export interface SnowfallWrapperProps {
    children?: React.ReactNode;
}

const SnowfallWrapper: FC<SnowfallWrapperProps> = ({ children }) => {
    const snowflakes = Array.from({ length: 40 }, (_, index) => {
        const isLarge = index % 10 === 0;
        const isMedium = index % 10 === 1;
        const left = `${(index % 10) * 10}%`;
        const delay = `${(index % 7) * 0.5}s`;
        const opacity = 1 - (index % 5) * 0.1;

        const animationClass = isLarge ? 'animate-snowfallLarge'
            : isMedium ? 'animate-snowfallMedium'
                : 'animate-snowfallSmall';

        const sizeClass = isLarge ? 'text-2xl'
            : isMedium ? 'text-xl'
                : 'text-lg';

        return (
            <div
                key={index}
                className={`absolute text-white pointer-events-none font-bold z-10 ${sizeClass} ${animationClass}`}
                style={{
                    left,
                    top: '-10px',
                    opacity,
                    animationDelay: delay,
                    animationIterationCount: 'infinite'
                }}
                aria-hidden="true"
            >
                ❅
            </div>
        );
    });

    return (
        <div className="relative w-full h-full">
            {snowflakes}
            {children}
            <style jsx global>{`
            @keyframes snowfallLarge {
              0% {
                transform: translate(0, -10px) rotate(0deg);
              }
              50% {
                transform: translate(20px, 50vh) rotate(180deg);
              }
              100% {
                transform: translate(0, 100vh) rotate(360deg);
              }
            }
    
            @keyframes snowfallMedium {
              0% {
                transform: translate(0, -10px) rotate(0deg);
              }
              50% {
                transform: translate(-15px, 50vh) rotate(-180deg);
              }
              100% {
                transform: translate(0, 100vh) rotate(-360deg);
              }
            }
    
            @keyframes snowfallSmall {
              0% {
                transform: translate(0, -10px) rotate(0deg);
              }
              50% {
                transform: translate(10px, 50vh) rotate(180deg);
              }
              100% {
                transform: translate(0, 100vh) rotate(360deg);
              }
            }
    
            .animate-snowfallLarge {
              animation: snowfallLarge 8s linear infinite;
            }
    
            .animate-snowfallMedium {
              animation: snowfallMedium 6s linear infinite;
            }
    
            .animate-snowfallSmall {
              animation: snowfallSmall 4s linear infinite;
            }
          `}</style>
        </div>
    );
};

export default SnowfallWrapper;