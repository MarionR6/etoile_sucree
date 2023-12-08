import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useContext, useState } from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from '../../../context';
import { Link } from "react-router-dom";


export default function Login() {

    const navigate = useNavigate();
    const [feedbackGood, setFeedbackGood] = useState("");
    const { login } = useContext(AuthContext);

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
        formState: {
            errors, isSubmitting
        }, setError, clearErrors } = useForm({
            defaultValues,
            mode: "onChange",
            resolver: yupResolver(yupSchema)
        });

    async function submit(values) {
        try {
            clearErrors();
            await login(values);
            setTimeout(() => {
                navigate("../");
            }, 3000);
            setFeedbackGood("Connexion réussie, vous allez être redirigé(e)");
        } catch (error) {
            setError("generic", { type: "generic", message: error });
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
                        {feedbackGood && <p className={`${styles.feedbackGood}`}>{feedbackGood}</p>}
                        {errors.generic && (
                            <p className={styles.feedback}>{errors.generic.message}</p>
                        )}
                    </div>

                    <div className={styles.forgottenPassword}>
                        <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
                    </div>

                    <button className="btn" disabled={isSubmitting}>Envoyer</button>
                </form>
            </div >
        </div>
    );
}
