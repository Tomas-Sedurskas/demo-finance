import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";

export const Header = () => {
  //Todo
  // add notifications
  // add profile pic
  // add logo

  return (
    <div className="py-3 px-6 border-b w-full">
      <div className="flex max-w-screen-2xl mx-auto  justify-between">
        <img src="/logo.svg" className="h-[40px] py-2" />

        <div className="flex gap-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="text-neutral-600 rounded-full"
                size="icon"
              >
                <Bell className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <div className="text-center border-b p-3">Your Notifications</div>
              <div className="p-3 flex flex-col">Notifications go here</div>
            </PopoverContent>
          </Popover>
          <Avatar>
            <AvatarImage src="/tomas.jpg" />
            <AvatarFallback className="bg-neutral-300">TS</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
