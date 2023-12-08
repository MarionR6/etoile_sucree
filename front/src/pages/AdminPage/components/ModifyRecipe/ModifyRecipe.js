import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from 'react';
import styles from "../../AdminPage.module.scss";
import { useParams } from "react-router-dom";

export default function ModifyRecipe() {

    const { id } = useParams();


    const imgRef = useRef();
    const [errorImg, setErrorImg] = useState("");
    // const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");
    const [details, setDetails] = useState();

    useEffect(() => {
        async function getRecipeDetails() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipeDetails/${id}`);
                if (response.ok) {
                    const detailsFromBack = await response.json();
                    setDetails(detailsFromBack[0]);
                    console.log(details);
                }
            } catch (error) {
                console.error(error);
            }
        } getRecipeDetails();
    }, []);

    const defaultValues = {
        recipeName: details?.recipeName,
        cookingTime: details?.cookingTime,
        preparingTime: details?.preparingTime,
        difficulty: details?.difficulty === "facile" ? "facile" : details?.difficulty === "intermédiaire" ? "intermédiaire" : "difficile",
        instructions: details?.instructions,
        img: details?.img,
        cakeIngredients: details?.cakeIngredients,
        icingIngredients: details?.icingIngredients,
        nbrOfPeople: details?.nbrOfPeople
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
        const response = await fetch(`http://localhost:8000/api/recipes/modifyRecipe/${id}`, {
            method: "PATCH",
            body: formData,
        });
        if (response.ok) {
            const newRecipe = await response.json();
            setFeedback(newRecipe);
        }

    }

    return (
        <div className={styles.formContainer}>
            <form
                onSubmit={handleSubmit(submit)}
                className={`cardBrown ${styles.form}`}
            >
                <h2>Ajouter une recette</h2>
                <div className={styles.oneFormElement}>
                    <label htmlFor="recipeName">Nom de la recette</label>
                    <input {...register("recipeName")}
                        type="text"
                        id="recipeName"
                        defaultValue={details?.recipeName} />
                    {errors.recipeName && <p className="form-error">{errors.recipeName.message}</p>}
                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="cookingTime">Temps de cuisson</label>
                    <input {...register("cookingTime")}
                        type="text"
                        id="cookingTime"
                        defaultValue={details?.cookingTime} />
                    {errors.cookingTime && <p className="form-error">{errors.cookingTime.message}</p>}
                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="preparingTime">Temps de préparation</label>
                    <input {...register("preparingTime")}
                        type="text"
                        id="preparingTime"
                        defaultValue={details?.preparingTime} />
                    {errors.preparingTime && <p className="form-error">{errors.preparingTime.message}</p>}
                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="difficulty">Difficulté</label>
                    <select
                        {...register("difficulty")}
                        id="difficulty"
                        defaultValue={details?.difficulty}
                    >
                        <option value="facile" defaultValue={details?.difficulty === "facile" ? true : false}>Facile</option>
                        <option value={"intermédiaire"}
                            defaultValue={details?.difficulty === "intermédiaire" ? true : false}>Intermédiaire</option>
                        <option value="difficile"
                            defaultValue={details?.difficulty === "difficile" ? true : false}>Difficile</option>
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
                        defaultValue={details?.instructions}
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
                        defaultValue={details?.cakeIngredients}
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
                        defaultValue={details?.icingIngredients}
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
                        defaultValue={details?.nbrOfPeople}
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
                </div>
                <div className={styles.buttonContainer}>
                    <button className="btn btn-primary">
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>

    );
}
