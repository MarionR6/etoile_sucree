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
import { ProtectedRoutes, ProtectedRoutesAdmin, ProtectedRoutesChangingPassword, ProtectedRoutesConnectedUser } from "./components/ProtectedRoutes/ProtectedRoutes";
import Profile from "./pages/Profile/Profile";
import ModifyInfo from "./pages/Profile/components/ModifyInfo/ModifyInfo";
import FavoriteRecipes from "./pages/Profile/components/FavoriteRecipes/FavoriteRecipes";
import DisplayRecipe from "./pages/Recipes/components/DisplayRecipe";
import RecipesDetails from "./pages/RecipesDetails/RecipesDetails";
import DeleteAccount from "./pages/Profile/components/DeleteAccount/DeleteAccount";
import ForgottenPassword from "./pages/Forms/ForgottenPassword/ForgottenPassword";
import ResetPassword from "./pages/Forms/ForgottenPassword/ResetPassword";
import ModifyPassword from "./pages/Profile/components/ModifyPassword/ModifyPassword";
import AddRecipe from "./pages/AdminPage/components/AddRecipe/AddRecipe";
import ManageRecipes from "./pages/AdminPage/components/ManageRecipes/ManageRecipes";
import ModifyRecipe from "./pages/AdminPage/components/ModifyRecipe/ModifyRecipe";

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
                element: (<ProtectedRoutesConnectedUser><FormsContainer /></ProtectedRoutesConnectedUser>),
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
                path: "/recette/:id",
                element: <RecipesDetails />
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
                    },
                    {
                        path: "/profil/modifier-mot-de-passe",
                        element: <ModifyPassword />
                    },
                    {
                        path: "/profil/suppression",
                        element: <DeleteAccount />
                    }
                ]
            },
            {
                path: "/mot-de-passe-oublie",
                element: <ForgottenPassword />
            },
            {
                path: "/resetPassword",
                element: (<ProtectedRoutesChangingPassword>
                    <ResetPassword />
                </ProtectedRoutesChangingPassword>)
            },
            {
                path: "/admin",
                element: (<ProtectedRoutesAdmin>
                    <AdminPage />
                </ProtectedRoutesAdmin>),
                children: [
                    {
                        path: "",
                        element: <AddRecipe />
                    },
                    {
                        path: "/admin/gestion-recettes",
                        element: <ManageRecipes />
                    },
                    {
                        path: "/admin/modifier-recette/:id",
                        element: <ModifyRecipe />
                    }
                ]
            }
        ]
    }
]);