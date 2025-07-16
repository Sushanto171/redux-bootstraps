import { AddTaskModal } from "@/components/module/AddTaskModal";
import Task from "@/components/module/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/redux";
import {
  filterState,
  taskSelector,
  type IFilter,
} from "@/redux/features/taskSlice";
import { useSelector } from "react-redux";

const Tasks = () => {
  const tasks = useSelector(taskSelector);
  const dispatch = useAppDispatch();
  const handleFilter = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLButtonElement;
    dispatch(filterState(target.dataset.value as IFilter));
  };

  return (
    <div className="w-3/5 mx-auto space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">Tasks</h3>
        <Tabs defaultValue="All">
          <TabsList onClick={handleFilter}>
            <TabsTrigger
              className="cursor-pointer"
              data-value="All"
              value="All"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              data-value="High"
              value="High"
            >
              High
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              data-value="Medium"
              value="Medium"
            >
              Medium
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer"
              data-value="Low"
              value="Low"
            >
              Low
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className=" flex flex-col gap-3">
        {tasks.map((task, i) => (
          <Task task={task} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
