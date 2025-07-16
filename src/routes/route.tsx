import App from "@/App";
import Tasks from "@/pages/Tasks";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Tasks,
      },
      {
        path: "/tasks",
        Component: Tasks,
      },
      {
        path: "/users",
        Component: Users,
      },
    ],
  },
]);
