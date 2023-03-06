import MainLayout from "Layout/Main";
import RegisterLayout from "Layout/Register";
import Entry from "Outlet/Entry";
import Login from "Outlet/Login";
import Register from "Outlet/Register";

import { createBrowserRouter } from "react-router-dom";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>error 404.</div>,
    children: [
      {
        path: "/",

        element: <Entry />,
      },
    ],
  },
  {
    path: "r",
    element: <RegisterLayout />,
    errorElement: <div>error 404.</div>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "r",
    element: <RegisterLayout />,
    errorElement: <div>error 404.</div>,
    children: [
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
