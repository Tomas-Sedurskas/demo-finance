import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ReactNode } from "react";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  transactor: string;
  date: string;
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
    header: "Date",
    cell: ({ getValue }) => {
      return <span>{new Date(getValue() as string).toDateString()}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      return <span>{getValue() as number}€</span>;
    },
  },
];
