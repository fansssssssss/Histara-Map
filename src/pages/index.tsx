import Image from "next/image";
import { Inter } from "next/font/google";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import tour1 from "@/data/jogja/tour1.json";
import calculateMiddlePoint from "@/utilities/CalculateCentroid";
// import Map from "@/components/Map";

function Home() {
  const { location, error } = useCurrentLocation();
  const [centroid, setCentroid] = useState<[number, number]>([0, 0]);
  const chars:string[] = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"]

  const markers: object[] = [];
  tour1.features.forEach((item: any) => {
    const marker = {
      position: [item.geometry.coordinates[1], item.geometry.coordinates[0]],
      iconUrl: "/A.png",
      iconSize: [18, 18],
      iconAnchor: [18, 18],
      popupAnchor: [9, 9],
      children: (
        <div className="font-semibold text-[16px] text-white font-poppins w-max bg-[#84899E] p-2 flex gap-[9px]">
          <div className="w-[60px] h-[55px] bg-[#D9D9D9] rounded-[8px]"></div>
          <p className="max-w-[120px] text-balance">{item.properties.name}</p>
          <div className="bg-white rounded-full text-black self-start size-[30px] flex justify-center items-center">{chars[item.properties.index]}</div>
        </div>
      ),
      key: item.properties.index,
    };
    markers.push(marker);
  });

  useEffect(() => {
    console.log(calculateMiddlePoint(tour1));
    setCentroid(calculateMiddlePoint(tour1));
  }, [location]);
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <div>Loading...</div>,
      }),
    []
  );
  return (
    <main>
      {/* {location.latitude},&nbsp;{location.longitude} */}
      <Map
        geojson={tour1}
        center={centroid}
        markers={markers}
        current={[location.latitude, location.longitude]}
      />
    </main>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
