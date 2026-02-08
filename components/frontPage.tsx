import React from 'react';
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  startTyping?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 50, className, onComplete, startTyping = true }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    if (!startTyping) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, delay, startTyping, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isTypingComplete && startTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

export default function FrontPage() {
    const [scrollY, setScrollY] = useState(0);
    const [nameComplete, setNameComplete] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div 
          className="w-screen h-screen bg-slate-500 z-[60] fixed"
          style={{
            bottom: `${scrollY}px`,
            left: "0px",
            backgroundImage: `url("/data_engineer.webp")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bottom-0 left-0 absolute p-12 flex flex-col">
            <h1 className="text-white font-bold -my-4 -ms-2 text-[120px] 2xl:text-[180px]">
              <TypewriterText 
                text="Marc Clausen"
                delay={100}
                onComplete={() => setNameComplete(true)}
              />
            </h1>
            <h1 className="text-white font-bold -my-4 text-[50px] 2xl:text-[70px]">
              <TypewriterText 
                text="Data Engineer"
                delay={50}
                startTyping={nameComplete}
              />
            </h1>
          </div>
        </div>
    );
}