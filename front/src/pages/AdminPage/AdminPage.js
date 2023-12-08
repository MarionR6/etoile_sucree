import styles from './AdminPage.module.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminPage() {

    const imgRef = useRef();
    const [errorImg, setErrorImg] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");

    const defaultValues = {
        recipeName: "",
        cookingTime: "",
        preparingTime: "",
        difficulty: "facile",
        instructions: "",
        img: "",
        cakeIngredients: "",
        icingIngredients: "",
        nbrOfPeople: 4
    };

    const recipeSchema = yup.object({
        recipeName: yup
            .string()
            .required("Ce champ est obligatoire"),
        cookingTime: yup
            .string()
            .required("Ce champ est obligatoire"),
        preparingTime: yup
            .string()
            .required("Ce champ est obligatoire"),
        difficulty: yup
            .string()
            .required("Ce champ est obligatoire"),
        instructions: yup
            .string()
            .required("Ce champ est obligatoire"),
        cakeIngredients: yup
            .string()
            .required("Ce champ est obligatoire"),
        icingIngredients: yup
            .string()
            .required("Ce champ est obligatoire"),
        nbrOfPeople: yup
            .number()
            .required("Ce champ est obligatoire")
    });

    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
        getValues,
        clearErrors,
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(recipeSchema),
    });

    async function submit() {
        const values = getValues();
        console.log(values);
        const formData = new FormData();
        formData.append("recipeName", values.recipeName);
        formData.append("cookingTime", values.cookingTime);
        formData.append("preparingTime", values.preparingTime);
        formData.append("difficulty", values.difficulty);
        formData.append("instructions", values.instructions);
        formData.append("cakeIngredients", values.cakeIngredients);
        formData.append("icingIngredients", values.icingIngredients);
        formData.append("nbrOfPeople", values.nbrOfPeople);

        if (imgRef.current && imgRef.current.files[0]) {
            const maxFileSize = 200000;
            if (imgRef.current.files[0].size > maxFileSize) {
                setErrorImg("Le fichier est trop volumineux, celui-ci ne doit pas dépasser 9Mo.");
                console.log("Fichier trop volumineux");
                return;
            }
            const supportedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
            const fileExtension = imgRef.current.files[0].name.split(".").pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorImg("Format de fichier non supporté.");
                console.log("Format non supporté");
                return;
            }
            formData.append("img", imgRef.current.files[0]);
        }
        const response = await fetch("http://localhost:8000/api/recipes/addRecipe", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const newRecipe = await response.json();
            if (newRecipe.message) {
                setFeedback(newRecipe.message);
                console.log(feedback);

            } else {
                setFeedbackGood(newRecipe.messageGood);
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                });
            }
        }

    }

    return (
        <>
            <Banner />
            {/* <div className={styles.formContainer}>
                <form
                    onSubmit={handleSubmit(submit)}
                    className={`cardBrown ${styles.form}`}
                >
                    <h2>Ajouter une recette</h2>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="recipeName">Nom de la recette</label>
                        <input {...register("recipeName")} type="text" id="recipeName" />
                        {errors.recipeName && <p className="form-error">{errors.recipeName.message}</p>}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="cookingTime">Temps de cuisson</label>
                        <input {...register("cookingTime")} type="text" id="cookingTime" />
                        {errors.cookingTime && <p className="form-error">{errors.cookingTime.message}</p>}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="preparingTime">Temps de préparation</label>
                        <input {...register("preparingTime")} type="text" id="preparingTime" />
                        {errors.preparingTime && <p className="form-error">{errors.preparingTime.message}</p>}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="difficulty">Difficulté</label>
                        <select
                            {...register("difficulty")}
                            id="difficulty"
                        >
                            <option value="facile" defaultValue="selected">Facile</option>
                            <option value="intermédiaire">Intermédiaire</option>
                            <option value="difficile">Difficile</option>
                        </select>
                        {errors.difficulty && (
                            <p className="form-error">{errors.difficulty.message}</p>
                        )}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            {...register("instructions")}
                            cols={200}
                            rows={10}
                            id="instructions"
                        />
                        {errors.instructions && (
                            <p className="form-error">{errors.instructions.message}</p>
                        )}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="cakeIngredients">Ingrédients du gâteau</label>
                        <textarea
                            {...register("cakeIngredients")}
                            cols={200}
                            rows={10}
                            id="cakeIngredients"
                        />
                        {errors.cakeIngredients && (
                            <p className="form-error">{errors.cakeIngredients.message}</p>
                        )}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="cakeIngredients">Ingrédients du glaçage</label>
                        <textarea
                            {...register("icingIngredients")}
                            cols={200}
                            rows={10}
                            id="icingIngredients"
                        />
                        {errors.icingIngredients && (
                            <p className="form-error">{errors.icingIngredients.message}</p>
                        )}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="nbrOfPeople">Pour combien de personnes ?</label>
                        <input type="number"
                            min={1}
                            max={10}
                            {...register("nbrOfPeople")}
                            id="nbrOfPeople"
                        />
                        {errors.nbrOfPeople && (
                            <p className="form-error">{errors.nbrOfPeople.message}</p>
                        )}
                    </div>
                    <div className={styles.oneFormElement}>
                        <label htmlFor="img">Photo de la recette</label>
                        <input {...register("img")} type="file" id="img"
                            ref={imgRef} />
                        {errors.img && <p className="form-error">{errors.img.message}</p>}
                    </div>
                    <div>
                        {feedback && <p>{feedback}</p>}
                        {feedbackGood && <p>{feedbackGood}</p>}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className="btn btn-primary">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            </div> */}
            <nav className={styles.adminNav}>
                <ul>
                    <li><NavLink end to="/admin">Ajouter une recette</NavLink></li>
                    <li><NavLink to="/admin/gestion-recettes">Gérer les recettes</NavLink></li>
                    <li><NavLink to="/admin/gestion-utilisateurs">Gérer les utilisateurs</NavLink></li>
                </ul>
            </nav>
            <Outlet />
            <BrownStrip />
        </>

    );
}
