import { useAppDispatch } from "@/hooks/redux";
import { deleteUser } from "@/redux/features/userSlice";
import { type IUser } from "@/types";
import { Trash2 } from "lucide-react";
interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border border-green-300 shadow p-4 flex justify-between items-center rounded-md">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h2 className={"text-lg font-semibold"}>{user.name}</h2>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4">
        <button onClick={() => dispatch(deleteUser(user.id))}>
          <Trash2 className="text-red-400 font-thin cursor-pointer" />
        </button>
        {/* <UpdateModal task={task} /> */}
      </div>
    </div>
  );
};

export default UserCard;
