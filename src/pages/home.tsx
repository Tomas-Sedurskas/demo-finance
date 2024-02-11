import { Card } from "@/components/card";
import { Dashboard } from "@/components/dashboard";
import { useState } from "react";
import { useQuery } from "react-query";

export const Home = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const { data } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch("https://json-mock-server-tau.vercel.app/cards");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });

  console.log(data);

  return (
    <div className="flex gap-6 p-6 w-full">
      <div className="flex flex-col w-96 gap-4">
        {data &&
          data.map((card: any) => (
            <Card key={card.id} {...card} setSelectedCard={setSelectedCard} />
          ))}
      </div>
      <Dashboard selectedCard={selectedCard} />
    </div>
  );
};
