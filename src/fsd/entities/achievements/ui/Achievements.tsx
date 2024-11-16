import { Card, CardHeader, Avatar, Chip, CardBody } from "@nextui-org/react";
import React from "react";

export function Achievements() {
  return (
    <div className="w-full flex flex-col">
      <Card className="w-full flex flex-row p-4 bg-zinc-900 mb-4">
        <CardHeader className="w-16 p-0 flex flex-col">
          <Avatar
            isBordered
            radius="md"
            size="lg"
            src="https://nextui.org/avatars/avatar-1.png"
            className="mb-3"
          />

          <Chip
            className="max-w-16 text-purple-700"
            variant="flat"
            color="secondary"
          >
            @zoe
          </Chip>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400 relative">
          <h2 className="font-semibold mb-2">Условная компания</h2>
          <p>
            Frontend developer and UI/UX enthusiast. Join me on this coding
            adventure!
          </p>
          <Chip
            color="success"
            variant="bordered"
            className="absolute right-0 top-0"
          >
            aaa
          </Chip>
        </CardBody>
      </Card>
    </div>
  );
}
