import { Link } from "react-router";
import { ModeToggle } from "../ui/MoodToggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-20 py-8">
      <Link to="/" className="font-bold text-lg">
        Logo
      </Link>
      <div className="flex items-center justify-end gap-10">
        <Link to="/tasks">Tasks</Link>
        <Link to="/users">Users</Link>
      </div>
      <ModeToggle />
    </div>
  );
};

export default Navbar;
