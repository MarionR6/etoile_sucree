import styles from './ForgottenPassword.module.scss';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

export default function ForgottenPassword() {

    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
    const { resetPasswordCode, setResetPasswordCode, setChangingPassword } = useContext(AuthContext);

    const navigate = useNavigate();

    const yupSchema = yup.object({
        email: yup
            .string()
            .required("Le champ est obligatoire")
            .matches(
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                "Votre email n'est pas valide"
            ),
    });

    const defaultValues = {
        email: ""
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(yupSchema),
    });

    async function submit(values) {
        console.log(values);

        try {
            const response = await fetch(`http://localhost:8000/api/users/resetPassword/${values.email}`);
            if (response.ok) {
                const resetCodeFromBack = await response.json();
                setResetPasswordCode(resetCodeFromBack);
                setFeedbackGood("Un email vous a été envoyé afin de réinitialiser votre mot de passe. Vous allez être redirigé(e).");
                console.log(resetPasswordCode);
                setChangingPassword(true);
                setTimeout(() => {
                    navigate(`/resetPassword?email=${values.email}`);
                }, 3000);

            } else {
                setFeedback("Une erreur s'est produite, veuillez réessayer plus tard.");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <section className={styles.sectionContainer}>
            <div className={styles.forgottenPasswordContainer}>
                <h1>Mot de passe oublié ?</h1>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <div className={styles.formPart}>
                        <label htmlFor="email">
                            Email :
                        </label>
                        <input type="email" id="email" {...register("email")} />
                    </div>
                    <div className={styles.inputError}>
                        {errors?.email && (
                            <p className={`${styles.feedback}`}>{errors.email.message}</p>
                        )}
                        {feedback && <p>{feedback}</p>}
                        {feedbackGood && <p>{feedbackGood}</p>}
                    </div>

                    <button className="btn" disabled={isSubmitting}>
                        Valider
                    </button>
                </form>
            </div>
        </section>

    );
}
