import { useState } from "react";
import { AuthContext } from "../../context";
import { useLoaderData } from "react-router-dom";
import { signin } from "../../api/users";

export default function AuthProvider({ children }) {

    // USE CONTEXT FOR THE USER'S FUNCTIONS

    const userConnect = useLoaderData(); // USE LOADER DATA TO GET THE ALREADY CONNECTED USER AND THEN LOAD THE APP, ONCE THE LOADER DATA GETS A USER SET TO THE CONNECTED USER OR NULL
    const [user, setUser] = useState(userConnect); // USE STATE THAT STORES THE CURRENT CONNECTED USER, EITHER CONTAINING THE USER'S INFO, OR NULL
    const [changingPassword, setChangingPassword] = useState(false); // USE STATE TO PREPARE THE USER TO SET A NEW PASSWORD

    const [resetPasswordCode, setResetPasswordCode] = useState([]); // USE STATE STORING THE RESET PASSWORD CODE SENT MY EMAIL TO THE USER

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