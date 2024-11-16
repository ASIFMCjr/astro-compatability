"use client";
import {
  $profile,
  getProfileEvent,
  updateProfileEvent,
} from "entities/profiles";
import background from "@/public/background/profile.svg";
import { Button, Card, Image, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { Container } from "shared/ui";
import { useUnit } from "effector-react";

export function ChangeProfilePage() {
  getProfileEvent();
  const profile = useUnit($profile);
  const [description, setDescription] = useState(profile.description);
  const [email, setEmail] = useState(profile.email);
  const [login, setLogin] = useState(profile.login);
  const [name, setName] = useState(profile.name);
  const [photo, setPhoto] = useState<{
    photo: ArrayBuffer | string | null;
    filename: string;
    url: string;
  }>({
    photo: new ArrayBuffer(0),
    filename: "",
    url: profile.photo || "",
  });
  const changePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto({
        photo: reader.result,
        filename: file.name,
        url: URL.createObjectURL(file),
      });
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = () => {
    updateProfileEvent({
      description,
      email,
      login,
      name,
      photo: String(photo.photo),
      photo_filename: photo.filename,
    });
  };
  return (
    <Container background={background} className="flex-row justify-center">
      <Card className="w-full bg-zinc-900 flex flex-col justify-center items-center">
        <h1>Изменение данных профиля</h1>
        <div className="max-w-[526px] p-3">
          <div className="border border-default w-64 rounded-3xl overflow-hidden relative">
            <Image
              alt="you"
              src={photo.url}
              fallbackSrc="https://icons.iconarchive.com/icons/hopstarter/soft-scraps/256/User-Administrator-Blue-icon.png"
              width={256}
              height={256}
              draggable={false}
              radius="lg"
            />
            <div className="absolute bottom-4 right-4 z-50">
              <Button isIconOnly color="success">
                <Image
                  width={20}
                  height={20}
                  radius="full"
                  alt="edit photo"
                  src="https://png.pngtree.com/png-clipart/20190614/original/pngtree-pencil-line-black-icon.-png-image_3746331.jpg"
                />
              </Button>
              <input
                onChange={changePhoto}
                type="file"
                className="absolute left-0 top-0 w-full h-full opacity-0"
              />
            </div>
          </div>
        </div>
        <div className="max-w-[526px] p-3">
          <Input
            key="outside"
            label="Имя"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            label="Почта"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inline-block mb-6"
          />
          <Textarea
            key="outside"
            label="Описание"
            labelPlacement="outside"
            placeholder="Введите текст"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="inline-block mb-6"
          />
        </div>

        <Button onClick={onSubmit} color="success" className="block">
          Обновить аккаунт
        </Button>
      </Card>
    </Container>
  );
}
