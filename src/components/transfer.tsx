import { useForm } from "react-hook-form";
import { Euro } from "lucide-react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/App";
import { DialogClose } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { buttonVariants } from "@/components/ui/button";
import { Payment } from "@/components/dataTable/columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/card";
import { BASE_URL, headers } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2).max(100),
  accountNumber: z.string().min(4).max(100),
  amount: z.number().min(1).max(100000),
});

export const Transfer = (card: Card) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      accountNumber: "",
      amount: 0,
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (newPayment: Payment) => {
      return fetch(`${BASE_URL}/paymentHistory`, {
        method: "POST",
        body: JSON.stringify({
          ...newPayment,
        }),
        headers,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["paymentHistory", card.id],
      });
      form.reset();
    },
  });

  const cardMutation = useMutation({
    mutationFn: (updatedCard: Card) => {
      return fetch(`${BASE_URL}/cards/${card.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...updatedCard,
        }),
        headers,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["cards"],
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    cardMutation.mutate({
      ...card,
      balance: card.balance - values.amount,
    });
    paymentMutation.mutate({
      id: `${Date.now()}`,
      amount: values.amount,
      status: "success",
      transactor: values.name,
      date: new Date().getTime(),
      type: "outgoing",
      cardId: card.id,
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
