import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/dataTable/dataTable";
import { columns } from "./dataTable/columns";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  selectedCard: string;
}

export const Dashboard = ({ selectedCard }: Props) => {
  const { data } = useQuery({
    queryKey: ["paymentHistory", selectedCard],
    enabled: !!selectedCard,
    queryFn: async () => {
      const res = await fetch(
        `https://json-mock-server-tau.vercel.app/paymentHistory?cardId=${selectedCard}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });

  const card = useQuery({
    queryKey: ["card", selectedCard],
    enabled: !!selectedCard,
    queryFn: async () => {
      const res = await fetch(
        `https://json-mock-server-tau.vercel.app/cards/${selectedCard}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });

  console.log("Render:", data);

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-2">
          <div className="border rounded-md p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span>Total Balance</span>
              {card.data ? (
                <div className="text-5xl">{card.data.balance}€</div>
              ) : (
                <Skeleton className="p-6" />
              )}
            </div>
            <div className="flex gap-2 text-lg">
              <span>****</span>
              <span>****</span>
              <span>****</span>
              <span>1234</span>
            </div>
            <div className="flex gap-2">
              <Button className="w-full">Transfer</Button>
              <Button className="w-full">Request</Button>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="border rounded-md p-6">
              <span>Total Income</span>
              <div className="text-3xl">9,294€</div>
            </div>
            <div className="border rounded-md p-6">
              <span>Total Expenses</span>
              <div className="text-3xl">9,294€</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full border rounded-md p-6">
          <span>Total Expenses</span>
          <div>
            <div className="text-3xl">9,294€</div>
            <div>from 10,000€</div>
          </div>
          <Progress value={93} />
        </div>
      </div>
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
};
