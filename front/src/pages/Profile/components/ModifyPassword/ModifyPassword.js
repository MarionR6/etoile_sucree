import React from 'react';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./ModifyPassword.module.scss";

export default function ModifyPassword() {

    const { user } = useContext(AuthContext);

    const userId = user.idUser;

    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");

    const defaultValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    const yupSchema = yup.object({
        currentPassword: yup
            .string()
            .required("Ce champ est nécessaire"),
        newPassword: yup
            .string()
            .min(6, "Le mot de passe est trop court")
            .required("Ce champ est nécessaire"),
        confirmPassword: yup
            .string()
            .required("Veuillez confirmer le mot de passe")
            .oneOf(
                [yup.ref("newPassword", "")], "Les mots de passe ne correspondent pas"
            )
    });

    const { register,
        handleSubmit,
        formState: {
            errors, isSubmitting
        }, setError, clearErrors } = useForm({
            defaultValues,
            mode: "onChange",
            resolver: yupResolver(yupSchema)
        });

    async function submitNewPassword(values) {
        console.log("En cours");
        try {
            setFeedback("");
            const response = await fetch(`http://localhost:8000/api/users/modifyPassword/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const responseFromBack = await response.json();
                setFeedbackGood(responseFromBack);
                console.log(feedbackGood);
                setTimeout(() => {
                    setFeedbackGood("");
                }, 3000);
            } else {
                const responseFromBack = await response.json();
                setFeedback(responseFromBack);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(submitNewPassword)}
                className={styles.modifyPasswordForm}>
                <label htmlFor="currentPassword">Mot de passe actuel</label>
                <input type="password"
                    id='currentPassword'
                    {...register("currentPassword")} />
                {errors?.currentPassword && (<p className={`${styles.feedback}`}>{errors.currentPassword.message}</p>)}
                <label htmlFor="newPassword">Nouveau mot de passe</label>
                <input type="password"
                    id='newPassword'
                    {...register("newPassword")} />
                {errors?.newPassword && (<p className={`${styles.feedback}`}>{errors.newPassword.message}</p>)}
                <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
                <input type="password"
                    id='confirmPassword'
                    {...register("confirmPassword")} />
                {feedback && <p className={styles.feedback}>{feedback}</p>}
                {feedbackGood && <p className={styles.feedbackGood}>{feedbackGood}</p>}
                <button className='btn'>Enregistrer</button>
            </form>
        </div>
    );
}
