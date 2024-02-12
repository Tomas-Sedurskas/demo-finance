import { Card } from "@/components/card";
import { Dashboard } from "@/components/dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { BASE_URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Home = () => {
  const [selectedCard, setSelectedCard] = useState("1");

  const { data, isLoading } = useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/cards`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="flex gap-6 p-6 w-full">
      <div className="flex flex-col w-96 gap-4">
        {isLoading && <Skeleton className="w-full h-40" />}
        {!isLoading &&
          data &&
          data.map((card: any) => (
            <Card
              key={card.id}
              {...card}
              setSelectedCard={setSelectedCard}
              selectedCard={selectedCard}
            />
          ))}
      </div>
      <Dashboard selectedCard={selectedCard} />
    </div>
  );
};
