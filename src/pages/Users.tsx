import { AddUserModal } from "@/components/module/AddUserModal";
import UserCard from "@/components/module/UserCard";
import { userSelector } from "@/redux/features/userSlice";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector(userSelector);
  return (
    <div className="w-3/5 mx-auto space-y-4">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-medium">Users</h3>
        <AddUserModal />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default User;
