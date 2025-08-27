"use client";

import Image from "next/image";

export default function CodeDisplay() {
  return (
    <div
      className={`
        absolute z-10
        left-28 -top-14
        sm:left-12 sm:-top-14
        md:left-20 md:-top-14
        lg:left-28 lg:-top-14
        xl:left-32
        2xl:left-36
        max-sm:scale-[0.55] max-sm:left-[-1.6rem] max-sm:-top-6
      `}
    >
      <div className="relative w-64 h-32 max-sm:w-40 max-sm:h-20">
        <Image
          src="/images/sponsors/image.png" // ← Your image path here
          alt="Code Display"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 256px"
          priority
        />
      </div>
    </div>
  );
}
