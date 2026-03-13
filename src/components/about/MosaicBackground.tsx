"use client";

import Image from "next/image";

const TILE_COUNT = 8;

export default function MosaicBackground() {
  return (
    <div
      className="absolute inset-0 grid grid-cols-2 grid-rows-4 md:grid-cols-4 md:grid-rows-2"
      aria-hidden
    >
      {Array.from({ length: TILE_COUNT }, (_, n) => (
        <div key={n} className="relative overflow-hidden">
          <Image
            src={`/images/about/mosaic/${n + 1}.jpg`}
            alt=""
            fill
            className="object-cover"
            sizes="25vw"
          />
        </div>
      ))}
    </div>
  );
}
