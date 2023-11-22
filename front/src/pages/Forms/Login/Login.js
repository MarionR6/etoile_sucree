import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useContext, useState } from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from '../../../context';


export default function Login() {

    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const { setUser } = useContext(AuthContext);

    const defaultValues = {
        mail: "",
        password: "",
    };

    const yupSchema = yup.object({
        mail: yup
            .string()
            .required("Ce champ est obligatoire"),
        password: yup
            .string()
            .required("Ce champ est obligatoire")
    });

    const { register,
        handleSubmit,
        reset,
        formState: {
            errors, isSubmitted
        } } = useForm({
            defaultValues,
            mode: "onChange",
            resolver: yupResolver(yupSchema)
        });

    async function submit(values) {
        try {
            // console.log(values);
            setFeedback("");
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const doesExist = await response.json();
                console.log(doesExist);
                if (doesExist.message) {
                    setFeedback(doesExist.message);
                } else {
                    setFeedbackGood("Connexion réussie, vous allez être redirigé(e)");
                    reset(defaultValues);
                    setUser({ ...doesExist, password: "" });
                    setTimeout(() => {
                        navigate("../");
                    }, 3000);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`${styles.signInUp}`}>
            <div className={`cardBrown ${styles.formContainer}`}>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>

                    <label htmlFor="mail">Adresse mail</label>
                    <input type="mail"
                        id="mail"
                        placeholder="L'adresse mail liée à votre compte"
                        {...register("mail")}
                    />
                    {errors?.mail && (<p className={`${styles.feedback}`}>{errors.mail.message}</p>)}

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                        id="password"
                        placeholder='Votre mot de passe'
                        {...register("password")}
                    />
                    {errors?.password && (<p className={`${styles.feedback}`}>{errors.password.message}</p>)}

                    <div className={styles.feedbackContainer}>
                        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                        {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                    </div>
                    <button className="btn" disabled={isSubmitted}>Envoyer</button>
                </form>
            </div >
        </div>
    );
}
