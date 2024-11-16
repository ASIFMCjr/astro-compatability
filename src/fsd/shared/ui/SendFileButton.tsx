import { Button } from "@nextui-org/react";

interface PropsType {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}

export function SendFileButton({ path, setPath }: PropsType) {
  return (
    <div>
      {path && <h2> Ссылка на файл: {path}</h2>}
      <Button
        disabled={!!path}
        color="success"
        variant="light"
        className="relative"
      >
        <input
          disabled={!!path}
          onChange={async (file: React.ChangeEvent<HTMLInputElement>) => {
            if (!file.target.files?.length) return;
            const formData = new FormData();
            formData.append(
              "file",
              file.target.files[0],
              file.target.files[0].name
            );
            const res = await fetch(
              "http://localhost:2999/api/achievements/file",
              {
                method: "POST",
                body: formData,
              }
            );
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newPath = (await res.json()) as any;
            setPath(newPath.address);
          }}
          type="file"
          className="absolute left-0 top-0 w-full h-full opacity-0"
        />
        Прикрепить документ
      </Button>
    </div>
  );
}
