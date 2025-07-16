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
import { addUser, type DraftUser } from "@/redux/features/userSlice";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

export function AddUserModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const form = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(addUser(data as DraftUser));
    form.reset();
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="cursor-pointer bg-green-500">Add User</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogDescription className="sr-only">Add User</DialogDescription>
          <DialogHeader>
            <DialogTitle>Add task</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        value={field.value || ""}
                        type="text"
                        placeholder="type name"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-4">
                <Button type="submit" className="cursor-pointer">
                  Add User
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
