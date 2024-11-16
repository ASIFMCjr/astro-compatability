"use client";
import { SendFileButton } from "shared/ui";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Textarea,
  Button,
  ModalFooter,
} from "@nextui-org/react";
import React, { useState } from "react";
import { deployContract } from "../model";

interface PropsType {
  isOpen: boolean;
  onOpenChange: () => void;
}

export function CreateAchievementModal({ isOpen, onOpenChange }: PropsType) {
  const [value, setValue] = useState("");
  const [path, setPath] = useState("");

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-zinc-900 text-default"
      classNames={{
        header: "[role=button]:hidden",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Создание достижения
            </ModalHeader>
            <ModalBody>
              <Textarea
                placeholder="Введите имя или описание"
                value={value}
                onValueChange={setValue}
              ></Textarea>
              <SendFileButton path={path} setPath={setPath} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await deployContract({ text: value, link: path });
                  onClose();
                }}
              >
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
