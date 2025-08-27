import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CitizenPage from "./pages/CitizenPage";
import "./styles/global.css";

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/analytics",
      element: <AnalyticsPage />,
    },
    {
      path: "/citizen",
      element: <CitizenPage />,
    },
    {
      path: "/admin",
      element: <AdminPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
