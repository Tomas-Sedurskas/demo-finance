import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/dataTable/dataTable";
import { Payment, columns } from "./dataTable/columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Transfer } from "@/components/transfer";
import { Card } from "./card";
import { BASE_URL } from "@/constants";

export const Dashboard = ({ selectedCard }: { selectedCard: string }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["paymentHistory", selectedCard],
    queryFn: async (): Promise<Payment[]> => {
      const res = await fetch(
        `${BASE_URL}/paymentHistory?cardId=${selectedCard}`
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
    queryFn: async (): Promise<Card> => {
      const res = await fetch(`${BASE_URL}/cards/${selectedCard}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  });

  const calculateTotals = (payments: Payment[]) => {
    return payments.reduce(
      (totals, payment) => {
        if (payment.type === "incoming") {
          totals.income += payment.amount;
        }
        if (payment.type === "outgoing") {
          totals.expenses += payment.amount;
        }
        return totals;
      },
      { income: 0, expenses: 0 }
    );
  };

  const { income, expenses } = useMemo(
    () => calculateTotals(data || []),
    [data]
  );

  if (isLoading || card.isLoading) return <LoadingSkeleton />;

  if (data && card.data)
    return (
      <div className="flex flex-col w-full gap-6">
        <div className="flex w-full gap-2">
          <div className="border rounded-md p-6 flex flex-col gap-6 w-full justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-black/60">Total Balance</span>
              <div className="text-5xl">{card.data.balance}€</div>
            </div>
            <div className="flex gap-1 flex-col">
              <span className="text-black/60">Card Number</span>
              <span className="text-xl">{card.data.cardNumber}</span>
            </div>
            <div className="flex gap-2 ">
              <Transfer {...card.data} />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full border rounded-md p-6">
              <span className="text-black/60">Spending Limit</span>
              <div className="flex flex-col gap-6">
                <div className="flex items-end gap-4">
                  <div className="text-3xl">{expenses.toFixed(2)}€</div>
                  <div className="text-xl text-black/60">
                    from {card.data.spendingLimit}€
                  </div>
                </div>

                <Progress
                  value={
                    expenses > card.data.spendingLimit
                      ? 100
                      : (expenses / card.data.spendingLimit) * 100
                  }
                  fillColor={
                    expenses > card.data.spendingLimit ? "bg-red-600/80" : ""
                  }
                />
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="border rounded-md p-6  w-full">
                <span className="text-black/60">Total Income</span>
                <div className="text-3xl">{income.toFixed(2)}€</div>
              </div>
              <div className="border rounded-md p-6  w-full">
                <span className="text-black/60">Total Expenses</span>
                <div className="text-3xl">{expenses.toFixed(2)}€</div>
              </div>
            </div>
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    );
};

console.log(new Date("2024-02-11").getTime());
console.log(new Date("2024-02-9").getTime());
console.log(new Date("2024-02-8").getTime());
console.log(new Date("2024-02-1").getTime());
console.log(new Date("2024-02-11").getTime());
console.log(new Date("2024-02-9").getTime());
console.log(new Date("2024-02-7").getTime());
console.log(new Date("2024-02-6").getTime());
console.log(new Date("2024-02-4").getTime());
console.log(new Date("2024-01-26").getTime());

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-64 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  );
};
