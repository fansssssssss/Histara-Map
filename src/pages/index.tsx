import Image from "next/image";
import { Inter } from "next/font/google";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import tour1 from "@/data/jogja/YG01.json";
import calculateMiddlePoint from "@/utilities/CalculateCentroid";
// import Map from "@/components/Map";

function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <h1 className="font-poppins text-3xl">Histara Map Service</h1>
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});

