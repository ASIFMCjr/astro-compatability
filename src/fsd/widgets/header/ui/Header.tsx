import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div>
      <Button as={Link} href="/tuda">
        tuda
      </Button>
      <Button as={Link} href="/syuda">
        Syuda
      </Button>
    </div>
  );
};

export default Header;
