import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AboutPage from "./pages/AboutPage";
import AdminPage from "./pages/AdminPage";
import CitizenPage from "./pages/CitizenPage";
import "./styles/global.css";
import RedeemSection from "./pages/RedeemSection";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement:<ErrorPage/>
    },
    {
      path: "/about",
      element: <AboutPage />,
      errorElement:<ErrorPage/>
    },
    {
      path: "/analytics",
      element: <AnalyticsPage />,
      errorElement:<ErrorPage/>
    },
    {
      path: "/citizen",
      element: <CitizenPage />,
      errorElement:<ErrorPage/>
    },
    {
      path: "/admin",
      element: <AdminPage />,
      errorElement:<ErrorPage/>
    },
    {
      path: "/redeem",
      element:<RedeemSection/>,
      errorElement:<ErrorPage/>
    }
  ]);
  return <RouterProvider router={router} />;
};

export default App;
