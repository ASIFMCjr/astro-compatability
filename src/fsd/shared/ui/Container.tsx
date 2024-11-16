import React from "react";

export function Container({
  children,
  background,
  className,
}: Readonly<{
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  background: any;
  className?: string;
}>) {
  return (
    <div
      className={`bg-black text-white w-full h-full bg-no-repeat bg-cover bg-center p-12 flex  
        ${className}`}
      style={{ backgroundImage: `url(${background.src})` }}
    >
      {children}
    </div>
  );
}
