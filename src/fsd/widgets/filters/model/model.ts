import { createEvent, createStore, sample } from "effector";

interface TabType {
  id: string;
  label: string;
  name: string;
}
export const tabs: TabType[] = [
  {
    id: "Новые",
    label: "Новые",
    name: "date",
  },
  {
    id: "А-Я",
    label: "А-Я",
    name: "alphabet",
  },
  {
    id: "Компания",
    label: "Компания",
    name: "company",
  },
  {
    id: "По статусу",
    label: "По статусу",
    name: "status",
  },
];
export const sortName = createStore<(typeof tabs)[number]["name"]>("date");
export const sortDirection = createStore<"asc" | "desc">("desc");

export const changeSortName = createEvent<(typeof tabs)[number]["name"]>();
export const changeSortDirection = createEvent<"asc" | "desc" | undefined>();

sample({
  clock: changeSortName,
  target: sortName,
});

sample({
  clock: changeSortDirection,
  source: sortDirection,
  fn: (storeDir, dir) => dir || (storeDir === "asc" ? "desc" : "asc"),
  target: sortDirection,
});
