"use client";
import { Input } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import axios from "axios";
import { LOCATION } from "../model";

export function GeoComponentInside() {
  const [location, setLocation] = useState<[number, number]>(
    LOCATION.center as [number, number]
  );
  const cityRef = useRef("");
  const handleSearch = async () => {
    const { data } = await axios.get(
      `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&geocode=${cityRef.current.replaceAll(".", "").replaceAll(" ", "+")}&format=json`
    );
    const geoData =
      data.response.GeoObjectCollection.featureMember[0].GeoObject;
    setLocation(
      geoData.Point.pos
        .split(" ")
        .map((i) => +i)
        .toReversed()
    );
  };

  return (
    <div>
      <p>SVO</p>
      <Input type="text" onChange={(e) => (cityRef.current = e.target.value)} />
      <button onClick={handleSearch}>Поиск</button>
      <div style={{ width: "600px", height: "400px" }}>
        {/* <YMap location={reactify.useDefault(LOCATION)}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />

          <YMapMarker
            coordinates={reactify.useDefault([37.588144, 55.733842])}
            draggable={true}
          >
            <section>
              <h1>You can drag this header</h1>
            </section>
          </YMapMarker>
        </YMap> */}

        <div>
          My awesome application with maps!
          <Map defaultState={LOCATION} state={{ center: location, zoom: 9 }} />
        </div>
      </div>
    </div>
  );
}

export function GeoComponent() {
  return (
    <YMaps
      query={{
        apikey: process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY,
      }}
    >
      <GeoComponentInside />
    </YMaps>
  );
}
