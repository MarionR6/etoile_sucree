import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/utilisateur" />;
}

export function ProtectedRoutesAdmin({ children }) { // FUNCTION TO PROTECT THE ADMIN ROUTES
    const { user } = useContext(AuthContext);
    return user ? (user.isAdmin ? (children) : (<Navigate to="/" />)) : (<Navigate to="/" />);
}

export function ProtectedRoutesChangingPassword({ children }) { // FUNCTION TO PROTECT THE ROUTE TO CHANGE PASSWORD
    const { changingPassword } = useContext(AuthContext);
    return changingPassword ? children : <Navigate to="/" />;
}

export function ProtectedRoutesConnectedUser({ children }) { // FUNCTION TO PROTECT ROUTES FOR COMPONENTS NEEDING A LOGGED IN USER TO BE RENDERED
    const { user } = useContext(AuthContext);
    return !user ? children : <Navigate to="/" />;
}