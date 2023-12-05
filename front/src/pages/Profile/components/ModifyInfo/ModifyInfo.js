import { useContext, useState } from 'react';
import styles from './ModifyInfo.module.scss';
import { AuthContext } from '../../../../context';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyUserInfo } from '../../../../api/users';


export default function ModifyInfo() {
    const { user, setUser } = useContext(AuthContext);
    const [viewForm, setViewForm] = useState(false);
    const [feedbackGood, setFeedbackGood] = useState("");

    const defaultValues = {
        name: user?.name,
        firstname: user?.firstname,
        mail: user?.mail,
        idUser: user?.idUser
    };

    const yupSchema = yup.object({
        name: yup
            .string()
            .required("Ce champ est nécessaire"),
        firstname: yup
            .string()
            .required("Ce champ est nécessaire"),
        mail: yup
            .string()
            .required("Ce champ est nécessaire")
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
            await modifyUserInfo(values);
            setUser({ ...user, name: values.name, firstname: values.firstname, mail: values.mail });
            setFeedbackGood("Vos informations ont été modifiées.");
            setTimeout(() => {
                setViewForm(false);
                setFeedbackGood("");
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className={styles.chosenCategory}>
            <h1 className={styles.chosenCategoryTitle}>Modifier mon profil</h1>
            <div className={styles.subContainerProfile}>
                <div className={styles.userInfoProfile}>
                    {viewForm ? (
                        <form onSubmit={handleSubmit(submit)}>
                            <label htmlFor="name" className={styles.oneInfo}>Nom</label>
                            <input type="text" id='name' className={styles.lockedInfo} {...register("name")} />
                            {errors?.name && (<p className={`${styles.feedback}`}>{errors.name.message}</p>)}
                            <label htmlFor="firstname" className={styles.oneInfo}>Prénom</label>
                            <input type="text" id='firstname' className={styles.lockedInfo} {...register("firstname")} />
                            {errors?.firstname && (<p className={`${styles.feedback}`}>{errors.firstname.message}</p>)}
                            <label htmlFor="mail" className={styles.oneInfo}>Adresse mail</label>
                            <input type="mail" id='mail' className={styles.lockedInfo} {...register("mail")} />
                            {errors?.mail && (<p className={`${styles.feedback}`}>{errors.mail.message}</p>)}
                        </form>
                    ) : (
                        <>
                            <div className={styles.oneInfo}>
                                <p className={styles.oneInfo}>Nom</p>
                                <p className={styles.lockedInfo}>
                                    {user?.name}</p>
                            </div>

                            <div className={styles.oneInfo}>
                                <p className={styles.oneInfo}>Prénom</p>
                                <p className={styles.lockedInfo}>{user?.firstname}</p>
                            </div>

                            <div className={styles.oneInfo}>
                                <p className={styles.oneInfo}>Adresse mail</p>
                                <p className={styles.lockedInfo}>{user?.mail}</p>
                            </div>

                        </>
                    )}
                    {viewForm && (<div className={styles.feedbackContainer}>
                        <p>{feedbackGood}</p></div>)}
                    <div className={styles.buttonsContainer}>
                        <button onClick={() => setViewForm(!viewForm)} className={`btn ${styles.modifyInfoButton}`} type='button' disabled={isSubmitting}>
                            {viewForm ? ("Annuler") : ("Modifier les informations")}
                        </button>
                        {viewForm && <button type='button' onClick={handleSubmit(submit)} className={`btn ${styles.modifyInfoButton}`} disabled={isSubmitting}>Enregistrer</button>}
                    </div>
                    <p className={styles.oneInfo}>Modifier mon mot de passe</p>
                </div>
                <div className={`line-dark ${styles.modifyProfileLine}`}></div>
                <div className={styles.favoriteRecipe}>

                </div>
            </div>
        </div>
    );
}
