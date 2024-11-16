import { Button } from "@nextui-org/react";
import React from "react";

interface PropsType {
  onOpen: () => void;
}
export function ModalButton({ onOpen }: PropsType) {
  return (
    <Button isIconOnly onPress={onOpen} color="success" className="p-0">
      <div className="rounded-full text-xl flex justify-center items-center text-green-500 bg-zinc-900 w-5 h-5">
        +
      </div>
    </Button>
  );
}
