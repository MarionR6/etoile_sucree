import { useState } from "react";
import { AuthContext } from "../../context";
import { useLoaderData } from "react-router-dom";
import { signin } from "../../api/users";

export default function AuthProvider({ children }) {

    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    const [changingPassword, setChangingPassword] = useState(false);

    const [resetPasswordCode, setResetPasswordCode] = useState([]);

    async function login(values) {
        const newUser = await signin(values);
        setTimeout(() => {
            setUser({ ...newUser, password: "" });

        }, 3000);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                resetPasswordCode,
                setResetPasswordCode,
                changingPassword,
                setChangingPassword
            }}>
            {children}
        </AuthContext.Provider>
    );
}