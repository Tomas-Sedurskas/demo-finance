import { Card } from "@/components/card";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="flex gap-6 p-6 w-full">
      <div className="flex flex-col w-96 gap-4">
        {["1", "2", "3"].map((key) => (
          <Card key={key} />
        ))}
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex w-full gap-2">
          <div className="flex flex-col gap-2">
            <div className="border rounded-md p-6 flex flex-col gap-6">
              <div>
                <span>Total Balance</span>
                <div className="text-5xl">9,294€</div>
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
            Add Spending Limit Here
          </div>
        </div>
        <div className="flex flex-col w-full border rounded-md p-6">
          Add Transactions Here
        </div>
      </div>
    </div>
  );
};
