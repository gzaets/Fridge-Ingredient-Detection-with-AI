'use client';

import { useState } from 'react';
import Image from 'next/image';
import ImageUpload from './components/ImageUpload';

export default function Home() {
  const [results, setResults] = useState([]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">Fridge AI</h1>

        <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-3xl p-6 sm:p-10">
          <ImageUpload onResult={setResults} />
          {results.length > 0 ? ( // Check if results has any items
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Detected Ingredients:</h2>
              <ul className="list-disc pl-5">
                {results.map((item, index) => (
                  <li key={index}>
                    {item.class} (Confidence: {(item.score * 100).toFixed(2)}%)
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Detected Ingredients:</h2>
              <p>No ingredients detected.</p> {/* Fallback message if no results */}
            </div>
          )}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/gzaets/Fridge-Ingredient-Detection-with-AI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="https://nextjs.org/icons/github.svg"
              alt="GitHub logo"
              width={20}
              height={20}
            />
            View on GitHub
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Next.js docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
