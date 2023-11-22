import styles from './Register.module.scss';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [feedback, setFeedback] = useState('');
    const [feedbackGood, setFeedbackGood] = useState('');

    const defaultValues = {
        name: "",
        firstname: "",
        mail: "",
        password: "",
        confirmPassword: "",
    };

    const yupSchema = yup.object({
        name: yup
            .string()
            .required("Le champ est obligatoire"),
        firstname: yup
            .string()
            .required("Le champ est obligatoire"),
        mail: yup
            .string()
            .email("Vous devez entrer une adresse mail valide")
            .required("Ce champ est obligatoire"),
        password: yup
            .string()
            .required("Ce champ est obligatoire")
            .min(6, "Le mot de passe est trop court"),
        confirmPassword: yup
            .string()
            .required("Vous devez confirmer le mot de passe")
            .oneOf(
                [yup.ref("password", "")],
                "Les mots de passes ne correspondent pas"
            )
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
            setFeedback("");
            const response = await fetch('http://localhost:8000/api/users/addUser', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const newUser = await response.json();
                console.log(newUser);
                if (newUser.message) {
                    setFeedback(newUser.message);
                } else {
                    setFeedbackGood(newUser.messageGood);
                    reset(defaultValues);
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
        <div className={`${styles.inscriptionArticle}`}>
            <div className={`cardBrown ${styles.formContainer}`}>
                <form onSubmit={handleSubmit(submit)} className={styles.form}>
                    <label htmlFor="name">Nom</label>
                    <input type="text"
                        id="name"
                        placeholder="Votre nom"
                        {...register("name")}
                    />
                    {errors?.name && (<p className={`${styles.feedback}`}>{errors.name.message}</p>)}

                    <label htmlFor="firstname">Prénom</label>
                    <input type="text"
                        id="firstname"
                        placeholder="Votre prénom"
                        {...register("firstname")}
                    />
                    {errors?.firstname && (<p className={`${styles.feedback}`}>{errors.firstname.message}</p>)}

                    <label htmlFor="mail">Adresse mail</label>
                    <input type="mail"
                        id="mail"
                        placeholder="Votre adresse mail"
                        {...register("mail")}
                    />
                    {errors?.mail && (<p className={`${styles.feedback}`}>{errors.mail.message}</p>)}

                    <label htmlFor="password">Mot de passe</label>
                    <input type="password"
                        id="password"
                        placeholder="Votre mot de passe"
                        {...register("password")}
                    />
                    {errors?.password && (<p className={`${styles.feedback}`}>{errors.password.message}</p>)}

                    <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                    <input type="password"
                        id="confirmPassword"
                        placeholder="Confirmez votre mot de passe"
                        {...register("confirmPassword")}
                    />
                    {errors?.confirmPassword && (<p className={`${styles.feedback}`}>{errors.confirmPassword.message}</p>)}
                    <div className={styles.feedbackContainer}>
                        {feedback && <p className={`${styles.feedback}`}>{feedback}</p>}
                        {feedback === "Email déjà existant" && <p className={styles.alreadyExists}>Souhaitez-vous vous&nbsp;<span className={`${styles.link}`}><Link to="../">connecter</Link></span>&nbsp;?</p>}
                        {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                    </div>
                    <button className="btn" disabled={isSubmitted}>Envoyer</button>
                </form>
            </div >
        </div>
    );
}
