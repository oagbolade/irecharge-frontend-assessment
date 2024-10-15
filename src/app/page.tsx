'use client';
import React from "react";
import dynamic from "next/dynamic";

const HomePage = dynamic(() => import("@/features/HomePage").then((mod) => mod.default), {
  ssr: false,
});

export default function Home() {
  return (
    <HomePage />
  );
}
