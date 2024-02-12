import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  transactor: string;
  date: number;
  type: "incoming" | "outgoing";
  cardId?: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "transactor",
    header: "Name",
    cell: ({ getValue }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/user.png" />
          </Avatar>
          <span>{getValue() as ReactNode}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      return <span className="capitalize">{getValue() as string}</span>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return <span>{new Date(getValue() as number).toDateString()}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => {
      if (info.row.original.type === "incoming") {
        return (
          <span className={"text-emerald-600"}>
            +{info.getValue() as number}€
          </span>
        );
      }
      return (
        <span className={"text-red-600"}>-{info.getValue() as number}€</span>
      );
    },
  },
];
