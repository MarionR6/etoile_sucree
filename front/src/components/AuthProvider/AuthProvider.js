import { useState } from "react";
import { AuthContext } from "../../context";
import { useLoaderData } from "react-router-dom";
import { signin } from "../../api/users";

export default function AuthProvider({ children }) {

    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    console.log(user);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    async function login(values) {
        const newUser = await signin(values);
        setUser({ ...newUser, password: "" });
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                feedback,
                setFeedback,
                feedbackGood,
                setFeedbackGood,
                login
            }}>
            {children}
        </AuthContext.Provider>
    );
}