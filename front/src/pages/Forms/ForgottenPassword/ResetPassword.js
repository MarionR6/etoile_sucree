import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context';
import styles from "./ResetPassword.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../../components/Banner/Banner';
import BrownStrip from '../../../components/BrownStrip/BrownStrip';

export default function ResetPassword() {

    const [enteredCode, setEnteredCode] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showInputCode, setShowInputCode] = useState(true);
    const [showInputPassword, setShowInputPassword] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    const { resetPasswordCode } = useContext(AuthContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setEnteredCode(value);
    };

    const compareCodes = () => { // COMPARING THE CODE TYPED BY THE USER TO THE ONE SENT BY EMAIL AND STORED IN A USESTATE
        if (resetPasswordCode == enteredCode) { // IF THE CODE IS CORRECT, IT HIDES THE CODE INPUT AND SHOWS THE NEW PASSWORD INPUT
            setShowInputCode(false);
            setShowInputPassword(true);
        } else if (!enteredCode) {
            setFeedback("Veuillez entrer le code reçu par mail");
        } else {
            setFeedback("Code erronné");
        }
    };

    const defaultValues = {
        password: "",
        confirmPassword: "",
    };

    const yupSchema = yup.object({
        password: yup
            .string()
            .required("Ce champ est obligatoire")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Le mot de passe doit contenir au moins 8 caractères dont un chiffre et une lettre"
            ),
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
            errors, isSubmitting
        }, setError, clearErrors } = useForm({
            defaultValues,
            mode: "onChange",
            resolver: yupResolver(yupSchema)
        });

    async function submit(values) {
        try {
            const response = await fetch(`http://localhost:8000/api/users/resetPassword/${email}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                const responseFromBack = await response.json();
                setFeedback(responseFromBack);
                setTimeout(() => {
                    navigate("/utilisateur");
                }, 3000);
            }

        } catch (error) {
            setError("generic", { type: "generic", message: error });
        }

    }

    const handleEnter = (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            e.preventDefault();
            compareCodes();
        }
    };

    return (
        <>
            <Banner />
            <div className={styles.resetPasswordContainer}>
                <div className={styles.resetPassword}>
                    {showInputCode &&
                        <form className={styles.enterCodeForm} onKeyDown={(e) => handleEnter(e)} onSubmit={() => compareCodes(enteredCode)}>
                            <label htmlFor="enterCode">Veuillez entrer le code reçu par mail :</label>
                            <input type="number" id='enterCode' onChange={handleChange} maxLength={4} />
                            {feedback && <p className={styles.feedback}>{feedback}</p>}
                            <button className='btn' type='button' onClick={() => compareCodes(enteredCode)}>Valider</button>
                            <p className={styles.infoCode}>Ne quittez pas cette page.</p>
                        </form>}
                    {showInputPassword &&
                        <form onSubmit={handleSubmit(submit)} className={styles.modifyPasswordForm} >
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
                            {feedback && <p className={styles.feedback}>{feedback}</p>}
                            <button className='btn'>Valider</button>
                        </form>}

                </div>

            </div>
            <BrownStrip />
        </>

    );
}
