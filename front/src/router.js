import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Homepage/Homepage";
import FormsContainer from "./pages/Forms/FormsContainer";
import Login from "./pages/Forms/Login/Login";
import Register from "./pages/Forms/Register/Register";
import AdminPage from "./pages/AdminPage/AdminPage";
import Services from "./pages/Services/Services";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
                path: "/admin",
                element: <AdminPage />
            }
        ]
    }
]);