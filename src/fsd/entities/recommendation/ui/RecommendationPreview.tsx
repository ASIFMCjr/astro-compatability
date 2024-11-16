import { AvatarGroup, Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
// className="flex gap-4 items-center"

export function RecommendationPreview() {
  return (
    <AvatarGroup isBordered max={3} total={10} radius="md" isGrid>
      <Link href="/profile/1">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </Link>

      <Link href="/profile/2">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      </Link>
      <Link href="/profile/3">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      </Link>
      <Link href="/profile/4">
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </Link>
    </AvatarGroup>
  );
}
