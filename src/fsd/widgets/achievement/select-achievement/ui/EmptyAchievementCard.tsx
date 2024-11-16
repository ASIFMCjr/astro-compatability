import { deployNFT } from "@/fsd/entities/achievements/model/deployContract";
import { Button, Card } from "@nextui-org/react";
import React from "react";

export function EmptyAchievementCard() {
  return (
    <Card className="p-4 w-full min-h-[255px] text-default flex flex-col justify-center items-center bg-zinc-900">
      <p className="w-full max-w-[300px] text-center">
        Выберите достижения для получения полной информации
      </p>
      <Button onPress={deployNFT}>Выпустить нфт</Button>
      <h1>
        Остальное можно протестировать на crypto репозитории или в Remix ide
      </h1>
      {/* <Button onPress={mintNFT}>Выпустить нфт еще</Button> */}

      {/* <Button onPress={getNfts}>Получить сертификаты</Button> */}
    </Card>
  );
}
