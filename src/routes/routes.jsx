import { useRoutes } from 'react-router-dom';
import LoginPage from "../pages/LoginPage/LoginPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import LandingPage from "../pages/LandingPage/LandingPage"
import Register from '../pages/Registropage/RegistroPage';
import RegistroPage from '../pages/Registropage/RegistroPage';

const Routes = () => {
  let routes = useRoutes([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
    { path: "/register", element: <Register /> },

    // <Route element = {MainLayout }>
    //   <Route path = "register" element = {RegistroPage} />
    // </Route>
  ]);
  return routes;
}

export default Routes;