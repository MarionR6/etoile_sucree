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
import { ProtectedRoutes, ProtectedRoutesAdmin } from "./components/ProtectedRoutes/ProtectedRoutes";
import Profile from "./pages/Profile/Profile";
import ModifyInfo from "./pages/Profile/components/ModifyInfo/ModifyInfo";
import FavoriteRecipes from "./pages/Profile/components/FavoriteRecipes/FavoriteRecipes";
import DisplayRecipe from "./pages/Recipes/components/DisplayRecipe";

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
                element: <Recipes />,
                children: [
                    {
                        path: "",
                        element: <DisplayRecipe />
                    }
                ]
            },
            {
                path: "/carte",
                element: <Menu />
            },
            {
                path: "/profil",
                element: (<ProtectedRoutes>
                    <Profile />
                </ProtectedRoutes>),
                children: [
                    {
                        path: "",
                        element: <ModifyInfo />
                    },
                    {
                        path: "/profil/favoris",
                        element: <FavoriteRecipes />
                    }
                ]
            },
            {
                path: "/admin",
                element: (<ProtectedRoutesAdmin>
                    <AdminPage />
                </ProtectedRoutesAdmin>)
            }
        ]
    }
]);