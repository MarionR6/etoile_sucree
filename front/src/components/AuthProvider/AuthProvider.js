import { useState } from "react";
import { AuthContext } from "../../context";
import { useLoaderData } from "react-router-dom";

export default function AuthProvider({ children }) {

    const userConnect = useLoaderData();
    const [user, setUser] = useState(userConnect);
    console.log(user);
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                feedback,
                setFeedback,
                feedbackGood,
                setFeedbackGood
            }}>
            {children}
        </AuthContext.Provider>
    );
}