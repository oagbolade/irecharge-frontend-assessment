'use client';
import dynamic from "next/dynamic";

const Details = dynamic(() => import("@/features/Details").then((mod) => mod.default), {
  ssr: false,
});

export default function DetailsPage() {
  return (
    <div>
      <Details />
    </div>
  );
}
