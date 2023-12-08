import { useContext } from "react";
import { AuthContext } from "../../context";
import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/utilisateur" />;
}

export function ProtectedRoutesAdmin({ children }) {
    const { user } = useContext(AuthContext);
    return user ? (user.isAdmin ? (children) : (<Navigate to="/" />)) : (<Navigate to="/" />);
}

export function ProtectedRoutesChangingPassword({ children }) {
    const { changingPassword } = useContext(AuthContext);
    return changingPassword ? children : <Navigate to="/" />;
}

export function ProtectedRoutesConnectedUser({ children }) {
    const { user } = useContext(AuthContext);
    return !user ? children : <Navigate to="/" />;
}