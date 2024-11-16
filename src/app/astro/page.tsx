"use client";
import { GeoComponent } from "features/geo-location";
import Chart from "@astrodraw/astrochart";
import React, { useEffect, useRef } from "react";

export default function page() {
  const paperRef = useRef<HTMLDivElement>(null);
  const data = {
    planets: {
      Lilith: [163.6862191060411],
      Chiron: [15.464961109096592],
      Pluto: [299.3731312637275],
      Neptune: [355.0834151238481],
      Uranus: [49.37306615182937],
      Saturn: [333.28795375073287],
      Jupiter: [35.58437603113426],
      Mars: [2267.67916690510231],
      Moon: [161.90673628534162],
      Sun: [280.5484846761654],
      Mercury: [262.21201020839766],
      Venus: [243.22043828582744],
      NNode: [21.033885601898927],
      SNode: [201.03388560189893],
    },
    cusps: [
      180.20663956936676, 213.2160305213528, 246.22542147333883,
      279.2348124253249, 306.2254214733388, 333.21603052135276,
      0.20663956936675731, 33.216030521352764, 66.22542147333883,
      99.23481242532488, 126.22542147333884, 153.2160305213528,
    ],
  };
  useEffect(() => {
    if (!self || !paperRef.current) return;
    const chart = new Chart(paperRef.current.id, 800, 800);
    const radix = chart.radix(data);
    radix.addPointsOfInterest({
      As: [],
      Ic: [279.2348124253249],
      Ds: [0.20663956936675731],
      Mc: [99.23481242532488],
    });
    radix.aspects();
    console.log(chart, radix);
  }, [paperRef]);

  return (
    <div>
      <p>page</p>
      <div id="paper" ref={paperRef}></div>
      <GeoComponent />
    </div>
  );
}
