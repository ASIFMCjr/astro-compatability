import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import {
  changeSortDirection,
  changeSortName,
  sortName,
  tabs,
} from "../model/model";
import { useUnit } from "effector-react";

export function Filters() {
  const name = useUnit(sortName);
  const handleSelectionChange = (key: string) => {
    if (key === name) return changeSortDirection();
    changeSortDirection("desc");
    changeSortName(key);
  };
  return (
    <div className="flex flex-row flex-nowrap mb-2">
      <Tabs
        aria-label="Dynamic tabs"
        onSelectionChange={(key) => handleSelectionChange(key as string)}
        items={tabs}
        className="mr-2"
        classNames={{
          tabList: "bg-zinc-900",
          cursor: "bg-zinc-700",
          tabContent:
            "group-data-[hover=true]:text-white group-data-[selected=true]:text-white",
        }}
      >
        {(item) => <Tab key={item.id} title={item.label} />}
      </Tabs>
    </div>
  );
}
