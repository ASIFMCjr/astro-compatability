import { createEvent, createStore, sample } from "effector";
import { LOCATION } from ".";

export const $location = createStore<[number, number]>(
  LOCATION.center as [number, number]
);

export const setLocation = createEvent<[number, number]>();

sample({
  clock: setLocation,
  target: $location,
});
