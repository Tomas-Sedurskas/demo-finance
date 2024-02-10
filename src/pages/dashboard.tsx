import { Card } from "@/components/card";

export const Dashboard = () => {
  return (
    <div className="flex gap-6 p-6 w-full">
      <div className="flex flex-col w-96 gap-4">
        {["1", "2", "3"].map((key) => (
          <Card key={key} />
        ))}
      </div>
      <div className="flex flex-col w-full">
        <div> Add Overview Here</div>

        <div>Add Transactions Here</div>
      </div>
    </div>
  );
};
