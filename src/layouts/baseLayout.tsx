import { PropsWithChildren } from "react";
import { Header } from "@/components/header";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
};
