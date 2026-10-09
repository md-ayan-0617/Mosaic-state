import React, { useState, useEffect } from 'react';

const WORDS = [
  'WEBSITES.',
  'PLATFORMS.',
  'MAPS.',
  'SYSTEMS.',
  'EXHIBITS.',
  'TOOLS.',
  'COMPLEXITY USABLE.',
];

export const TypeState: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFinishedCycle, setIsFinishedCycle] = useState(false);

  useEffect(() => {
    if (isFinishedCycle) return;

    const currentWord = WORDS[wordIndex];
    const isFinalWord = wordIndex === WORDS.length - 1;

    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentWord.length) {
      // Typing next character
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, Math.floor(Math.random() * 20) + 45); // 45-65ms speed
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      if (isFinalWord) {
        // Stop on final statement!
        setIsFinishedCycle(true);
        return;
      }
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && charIndex > 0) {
      // Deleting character
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else if (isDeleting && charIndex === 0) {
      // Move to next word
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, isFinishedCycle]);

  const currentDisplay = WORDS[wordIndex].substring(0, charIndex);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '0.3em',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
        WE MAKE
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          color: 'var(--system-blue)',
          fontWeight: 400,
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        {currentDisplay}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '0.85em',
            backgroundColor: 'var(--system-blue)',
            marginLeft: '4px',
            animation: 'blinkCursor 0.9s infinite',
          }}
          aria-hidden="true"
        />
      </span>
      <style>{`
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};
