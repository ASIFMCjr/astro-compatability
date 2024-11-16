"use client";
import { GeoComponent } from "features/geo-location";
import Chart from "@astrodraw/astrochart";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { cosmogramApi } from "@/fsd/shared/api";
import {
  AstroData,
  Points,
} from "@astrodraw/astrochart/dist/project/src/radix";
import { useUnit } from "effector-react";
import { $location } from "@/fsd/features/geo-location/model/model";

export default function Astro() {
  const location = useUnit($location);
  const paperRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState([
    {
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
      ascendant: 319.62565761260134,
      cusps: [
        180.20663956936676, 213.2160305213528, 246.22542147333883,
        279.2348124253249, 306.2254214733388, 333.21603052135276,
        0.20663956936675731, 33.216030521352764, 66.22542147333883,
        99.23481242532488, 126.22542147333884, 153.2160305213528,
      ],
      aspects: [
        {
          planet1: "Sun",
          planet2: "Uranus",
          aspect: "Opposition",
          angle: 179.3436426393043,
        },
        {
          planet1: "Sun",
          planet2: "Neptune",
          aspect: "Trine",
          angle: 122.64969543506587,
        },
        {
          planet1: "Moon",
          planet2: "Uranus",
          aspect: "Conjunction",
          angle: 7.560901756939984,
        },
        {
          planet1: "Moon",
          planet2: "SNode",
          aspect: "Trine",
          angle: 122.758822979786,
        },
        {
          planet1: "Mercury",
          planet2: "Jupiter",
          aspect: "Opposition",
          angle: 178.00460278707982,
        },
        {
          planet1: "Mercury",
          planet2: "Saturn",
          aspect: "Square",
          angle: 85.67856539987679,
        },
        {
          planet1: "Venus",
          planet2: "SNode",
          aspect: "Square",
          angle: 90.03259532493112,
        },
        {
          planet1: "Mars",
          planet2: "Pluto",
          aspect: "Opposition",
          angle: 176.34905781134387,
        },
        {
          planet1: "Mars",
          planet2: "Lilith",
          aspect: "Square",
          angle: 85.3639650252116,
        },
        {
          planet1: "Mars",
          planet2: "NNode",
          aspect: "Trine",
          angle: 118.00522268375326,
        },
        {
          planet1: "Pluto",
          planet2: "Lilith",
          aspect: "Square",
          angle: 90.98509278613227,
        },
        {
          planet1: "Pluto",
          planet2: "SNode",
          aspect: "Trine",
          angle: 114.35428049509713,
        },
        {
          planet1: "NNode",
          planet2: "SNode",
          aspect: "Opposition",
          angle: 180,
        },
      ],
    },
    {
      As: [],
      Ic: [279.2348124253249],
      Ds: [0.20663956936675731],
      Mc: [99.23481242532488],
    },
  ]);
  useEffect(() => {
    if (!self || !paperRef.current || paperRef.current.hasChildNodes()) return;
    const chart = new Chart(paperRef.current.id, 800, 800);
    const radix = chart.radix(data[0] as AstroData);
    radix.addPointsOfInterest(data[1] as unknown as Points);
    radix.aspects();
    console.log(chart, radix);
  }, [paperRef, data]);

  const handleSubmit = async () => {
    const {
      data: { planets, ascendant, cusps, aspects, ic, ds, mc },
    } = await cosmogramApi.cosmogram.createCosmogramCosmogramPost({
      birth_date: new Date().toISOString(),
      latitude: location[0],
      longitude: location[1],
    });
    setData([
      {
        planets,
        ascendant,
        cusps,
        aspects: aspects as {
          planet1: string;
          planet2: string;
          aspect: string;
          angle: number;
        }[],
      },
      {
        As: [],
        Ic: ic,
        Ds: ds,
        Mc: mc,
      },
    ]);
  };

  return (
    <div>
      <GeoComponent />
      <Button onClick={handleSubmit}>Получить карту</Button>
      <div id="paper" ref={paperRef}></div>
    </div>
  );
}
