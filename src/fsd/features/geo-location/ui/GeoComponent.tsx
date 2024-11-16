"use client";
import { Input } from "@nextui-org/react";
import React, { useRef } from "react";
import { YMaps, Map } from "@pbe/react-yandex-maps";
import axios from "axios";
import { LOCATION } from "../model";
import { $location, setLocation } from "../model/model";
import { useUnit } from "effector-react";

export function GeoComponentInside() {
  const location = useUnit($location);
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
