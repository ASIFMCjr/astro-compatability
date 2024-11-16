import { AchievementCard } from "@/fsd/entities/achievements";
import React from "react";
import { EmptyAchievementCard } from "./EmptyAchievementCard";

export function SelectAchievement() {
  const achievement = null;
  return achievement ? <AchievementCard /> : <EmptyAchievementCard />;
}
