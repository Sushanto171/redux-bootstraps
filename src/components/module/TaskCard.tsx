import { useAppDispatch } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { deleteTask, toggleCompleteState } from "@/redux/features/taskSlice";
import { userSelector } from "@/redux/features/userSlice";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Checkbox } from "../ui/checkbox";
import { UpdateModal } from "./UpdateModal";

export interface IProps {
  task: ITask;
}

const Task = ({ task }: IProps) => {
  const dispatch = useAppDispatch();
  const users = useSelector(userSelector);
  const user = users.find((user) => user.id === task.assignedTo);
  return (
    <div className="border border-green-300 shadow p-4 flex justify-between items-center rounded-md">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div
            className={cn("size-3 rounded-full ", {
              "bg-red-400": task.priority === "High",
              "bg-yellow-400": task.priority === "Medium",
              "bg-green-400": task.priority === "Low",
            })}
          ></div>
          <h2
            className={cn("text-lg font-semibold", {
              "line-through": task.isCompleted,
            })}
          >
            {task.title}
          </h2>
        </div>
        <p>{task.description}</p>
        <p>Assigned to - {user?.name || "No One"}</p>
      </div>

      <div className="flex flex-col items-center justify-between gap-4">
        <button>
          <Trash2
            onClick={() => dispatch(deleteTask(task.id))}
            className="text-red-400 font-thin cursor-pointer"
          />
        </button>
        <div className="cursor-pointer ">
          <Checkbox
            defaultChecked={task.isCompleted}
            onClick={() => dispatch(toggleCompleteState(task.id))}
            className=" w-5 h-5"
          />
        </div>
        <UpdateModal task={task} />
      </div>
    </div>
  );
};

export default Task;
