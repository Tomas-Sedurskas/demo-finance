import { PropsWithChildren } from "react";
import { Header } from "@/components/header";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};
