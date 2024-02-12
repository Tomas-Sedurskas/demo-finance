import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Euro } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Payment } from "./dataTable/columns";
import { queryClient } from "@/App";
import { DialogClose } from "@radix-ui/react-dialog";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  accountNumber: z.string().min(4).max(100),
  amount: z.number().min(1).max(10000),
});

interface Props {
  selectedCard: string;
}

export const Transfer = ({ selectedCard }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      accountNumber: "",
      amount: 0,
    },
  });

  const mutation = useMutation({
    mutationFn: (newPayment: Payment) => {
      return fetch("https://json-mock-server-tau.vercel.app/paymentHistory", {
        method: "POST",
        body: JSON.stringify({
          ...newPayment,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paymentHistory", selectedCard],
      });
      form.reset();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      id: `${Date.now()}`,
      amount: values.amount,
      status: "success",
      transactor: values.name,
      date: new Date().toISOString().split("T")[0],
      type: "outgoing",
      cardId: selectedCard,
    });
  }

  return (
    <Dialog>
      <DialogTrigger
        className={`${buttonVariants({ variant: "default" })} w-full`}
      >
        Transfer
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-12">
        <DialogTitle>Transfer</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficiery's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input placeholder="LT12 1000 0111 0100 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        {...field}
                        value={
                          field.value > 0
                            ? `${field.value}`.replace(/\b0+/g, "")
                            : field.value
                        }
                        type="number"
                        onChange={(event) => {
                          let num = `${event.target.value}`;
                          field.onChange(+num);
                        }}
                      />
                      <div className="flex items-center justify-center px-3 bg-neutral-200 rounded-md">
                        <Euro className="w-4 h-4 " />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    The amount will be denominated in Euros.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.formState.isValid ? (
              <DialogClose asChild>
                <Button type="submit" className="w-full">
                  Confirm Transfer
                </Button>
              </DialogClose>
            ) : (
              <Button type="submit" className="w-full">
                Confirm Transfer
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
