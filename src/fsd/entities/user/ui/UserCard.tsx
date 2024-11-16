import {
  Card,
  CardHeader,
  Avatar,
  Chip,
  CardBody,
  CardFooter,
  Button,
  Link,
  Image,
} from "@nextui-org/react";
import { useUnit } from "effector-react";
import React from "react";
import { $profile, getProfileEvent } from "entities/profiles";

export function UserCard() {
  getProfileEvent();
  const profile = useUnit($profile);
  return (
    <Card className="w-full bg-zinc-900  border border-purple-600 mb-6">
      <CardHeader className="justify-between ">
        <div className="w-14 mr-4">
          <Avatar
            isBordered
            color="default"
            radius="md"
            size="lg"
            src={profile.photo}
          />
        </div>
        <div className="flex flex-col justify-between justify-items-start gap-1 items-start h-full w-full">
          <h4 className="text-small font-semibold leading-none text-white w-full h-1/2">
            {profile.name}
          </h4>
          <Chip color="secondary" className="h-1/2 w-full">
            {profile.login}
          </Chip>
        </div>
        <Button
          as={Link}
          href="/profile/change"
          isIconOnly
          className="bg-zinc-700 self-start w-10 ml-4"
        >
          <Image
            width={20}
            height={20}
            alt="settings"
            src="https://www.citypng.com/public/uploads/preview/settings-white-outline-icon-download-png-701751694974641xsiiydfokh.png"
          />
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{profile.description}</p>
      </CardBody>
      <CardFooter className="gap-3 flex place-content-end">
        <Chip variant="flat" color="secondary" className="text-purple-700">
          {profile.email}
        </Chip>
      </CardFooter>
    </Card>
  );
}
