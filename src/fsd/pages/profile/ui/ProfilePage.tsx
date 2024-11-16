"use client";
import React from "react";
import background from "@/public/background/profile.svg";
import { Container, ModalButton } from "shared/ui";
import { useDisclosure } from "@nextui-org/react";
import { Filters } from "widgets/filters";
import { Achievements, CreateAchievementModal } from "entities/achievements";
import { UserCard } from "entities/user";
import { RecommendationPreview } from "entities/recommendation";
import { SelectAchievement } from "widgets/achievement/select-achievement";

export function ProfilePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Container background={background} className="flex-row justify-center">
      <div className="w-1/2 max-w-[526px] p-3">
        <UserCard />

        <div>
          <h1 className="text-base font-bold mb-2">Достижения</h1>
          <div className="flex flex-row">
            <Filters />
            <ModalButton onOpen={onOpen} />
          </div>

          <Achievements />
        </div>
      </div>
      <div className="w-full max-w-[1026px] p-3">
        <div className="mb-5">
          <h2 className="text-bold mb-3">Рекомендации</h2>
          <RecommendationPreview />
        </div>
        <SelectAchievement />
      </div>
      <CreateAchievementModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </Container>
  );
}
