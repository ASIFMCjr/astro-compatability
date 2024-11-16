"use client";
import { createProfileEvent } from "entities/profiles";
import background from "@/public/background/profile.svg";
import { Button, Card, Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { Container } from "shared/ui";

export function CreateProfilePage() {
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("worker");
  const onSubmit = () => {
    createProfileEvent({
      description,
      email,
      login,
      name,
      role,
    });
  };
  return (
    <Container background={background} className="flex-row justify-center">
      <Card className="w-full bg-zinc-900 flex flex-col justify-center items-center">
        <h1>Создание профиля</h1>
        <div className="max-w-[500px] p-3">
          <Input
            key="outside"
            label="Описание"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="inline-block mb-6"
          />
          <Input
            key="outside"
            label="Почта"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inline-block mb-6"
          />
          <Input
            key="outside"
            label="Логин"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="inline-block mb-6"
          />
          <Input
            key="outside"
            label="Имя"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="inline-block mb-6"
          />
          <Tabs
            onSelectionChange={(key) => setRole(key as string)}
            className="block"
            classNames={{
              tabList: "bg-zinc-900",
              cursor: "bg-zinc-700",
              tabContent:
                "group-data-[hover=true]:text-white group-data-[selected=true]:text-white",
            }}
          >
            <Tab key="worker" title="Работник" />
            <Tab key="employer" title="Работодатель" />
          </Tabs>
        </div>
        <Button onClick={onSubmit} color="success" className="block">
          Создать аккаунт
        </Button>
      </Card>
    </Container>
  );
}
