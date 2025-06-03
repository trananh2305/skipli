import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import PhoneVerifyPage from "./pages/auth/PhoneVerifyPage";
import LoginEmployee from "./pages/auth/LoginEmployeePage";
import EmailVerify from "./pages/auth/EmailVerifyPage";
import OwnerLayout from "./pages/owner/OwnerLayout";
import ManagementEmployee from "./pages/owner/ManagementEmployee";
import ManageMessages from "./pages/owner/ManageMessages";
import ChatDetail from "./components/ChatDetail";

const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "verify-phone",
    element: <PhoneVerifyPage />,
  },
  {
    path: "employee",
    children: [
      {
        path: "login",
        element: <LoginEmployee />,
      },
      {
        path: "verify-email",
        element: <EmailVerify />,
      },
    ],
  },
  {
    element: <OwnerLayout />,
    children: [
      {
        path: "manage-employee",
        element: <ManagementEmployee />,
      },
      {
        path: "message",
        element: <ManageMessages />,
        children: [
          {
            path: ":id",
            element: <ChatDetail />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
