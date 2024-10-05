'use client';

import { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload';

export default function Home() {
  const [results, setResults] = useState(null);

  // Effect to create the snow effect when the component mounts
  useEffect(() => {
    createSnowEffect();
  }, []);

  // Function to create the snow effect
  const createSnowEffect = () => {
    const snowContainer = document.createElement('div');
    snowContainer.classList.add('snow-container');
    document.body.appendChild(snowContainer);

    // Generate 100 snowflakes
    for (let i = 0; i < 100; i++) {
      const snowflake = document.createElement('div');
      snowflake.classList.add('snowflake');
      
      // Set the horizontal position randomly across the viewport
      snowflake.style.left = Math.random() * 100 + 'vw';

      // Spawn the snowflakes slightly above the screen (negative vh)
      snowflake.style.top = Math.random() * -20 + 'vh';

      // Set random animation duration for varying fall speeds
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = Math.random();

      // Set the animation for falling beyond the viewport
      snowflake.style.animationName = 'falling';
      snowflake.style.animationTimingFunction = 'linear';
      snowContainer.appendChild(snowflake);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-full max-w-3xl">
        <h1 className="text-5xl font-semibold mb-6 text-center neon-text flicker-effect cyberpunk-font">
          Fridge AI
        </h1>
        <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6 sm:p-10">
          <ImageUpload onResult={setResults} />
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center bg-black text-white gap-2 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/gzaets/Fridge-Ingredient-Detection-with-AI"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}
