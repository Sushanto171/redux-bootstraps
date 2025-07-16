import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { updateTask } from "@/redux/features/taskSlice";
import type { ITask } from "@/types";
import { DialogDescription } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon, LocationEdit } from "lucide-react";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import type { IProps } from "./TaskCard";

export function UpdateModal({ task }: IProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      updateTask({
        ...data,
        id: task.id,
        dueDate: new Date(data.dueDate || task.dueDate).toLocaleDateString(),
      } as ITask)
    );
    form.reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="size-5 cursor-pointer bg-green-500">
            <LocationEdit className="size-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">Update Task</DialogDescription>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title </FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        defaultValue={task.title}
                        type="text"
                        placeholder="type title"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-description="description">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        defaultValue={task.description || ""}
                        required
                        placeholder="write description"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal",
                              !task.dueDate && "text-muted-foreground"
                            )}
                          >
                            {field.value || task.dueDate ? (
                              format(field.value || task.dueDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel aria-description="Priority">Priority</FormLabel>
                    <FormControl>
                      <Select
                        required
                        onValueChange={field.onChange}
                        defaultValue={task.priority}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a priority" />
                        </SelectTrigger>
                        <SelectContent className="cursor-pointer">
                          <SelectGroup>
                            <SelectLabel>Priority</SelectLabel>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Low">Low</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <Button type="submit" className="cursor-pointer">
                  Update Task
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
