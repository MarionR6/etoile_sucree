import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { userLoader } from "./loaders/userLoader";

import Homepage from "./pages/Homepage/Homepage";
import FormsContainer from "./pages/Forms/FormsContainer";
import Login from "./pages/Forms/Login/Login";
import Register from "./pages/Forms/Register/Register";
import AdminPage from "./pages/AdminPage/AdminPage";
import Services from "./pages/Services/Services";
import Recipes from "./pages/Recipes/Recipes";
import Menu from "./pages/Menu/Menu";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Profile from "./pages/Profile/Profile";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: userLoader,
        children: [
            {
                path: "/",
                element: <Homepage />
            },
            {
                path: "/utilisateur",
                element: <FormsContainer />,
                children: [
                    {
                        path: "",
                        element: <Login />
                    },
                    {
                        path: "/utilisateur/inscription",
                        element: <Register />
                    }
                ]
            },
            {
                path: "/services",
                element: <Services />
            },
            {
                path: "/recettes",
                element: <Recipes />
            },
            {
                path: "/carte",
                element: <Menu />
            },
            {
                path: "/profil",
                element: (<ProtectedRoutes>
                    <Profile />
                </ProtectedRoutes>)
            },
            {
                path: "/admin",
                element: <AdminPage />
            }
        ]
    }
]);