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
    const [modifiedInfo, setModifiedInfo] = useState(null);

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

    const handleShowPen = (n) => {
        console.log(n);
        setModifiedInfo(n);
    };

    const changeValue = (e, choice) => {
        let value = e.target.value;
        let values = { value, choice };
        submit(values);
    };

    async function submit(values) {
        console.log(values);
    }

    // async function submit() {
    //     const values = getValues();
    //     console.log(values);
    //     const formData = new FormData();
    //     formData.append("recipeName", values.recipeName);
    //     formData.append("cookingTime", values.cookingTime);
    //     formData.append("preparingTime", values.preparingTime);
    //     formData.append("difficulty", values.difficulty);
    //     formData.append("instructions", values.instructions);
    //     formData.append("cakeIngredients", values.cakeIngredients);
    //     formData.append("icingIngredients", values.icingIngredients);
    //     formData.append("nbrOfPeople", values.nbrOfPeople);

    //     if (imgRef.current && imgRef.current.files[0]) {
    //         const maxFileSize = 200000;
    //         if (imgRef.current.files[0].size > maxFileSize) {
    //             setErrorImg("Le fichier est trop volumineux, celui-ci ne doit pas dépasser 9Mo.");
    //             console.log("Fichier trop volumineux");
    //             return;
    //         }
    //         const supportedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
    //         const fileExtension = imgRef.current.files[0].name.split(".").pop().toLowerCase();
    //         if (!supportedExtensions.includes(fileExtension)) {
    //             setErrorImg("Format de fichier non supporté.");
    //             console.log("Format non supporté");
    //             return;
    //         }
    //         formData.append("img", imgRef.current.files[0]);
    //     }
    //     const response = await fetch(`http://localhost:8000/api/recipes/modifyRecipe/${id}`, {
    //         method: "PATCH",
    //         body: formData,
    //     });
    //     if (response.ok) {
    //         const newRecipe = await response.json();
    //         setFeedback(newRecipe);
    //     }

    // }

    return (
        <div className={styles.formContainer}>
            <form
                className={`cardBrown ${styles.form}`}
            >
                <h2>Modifier une recette</h2>
                <div className={styles.oneFormElement}>
                    <label htmlFor="recipeName">Nom de la recette</label>
                    <input
                        type="text"
                        id="recipeName"
                        onClick={() => handleShowPen(1)}
                        onChange={(e) => changeValue(e, "recipeName")}
                        defaultValue={details?.recipeName} />
                    {modifiedInfo === 1 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="cookingTime">Temps de cuisson</label>
                    <input
                        onClick={() => handleShowPen(2)}
                        type="text"
                        id="cookingTime"
                        defaultValue={details?.cookingTime} />
                    {modifiedInfo === 2 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}
                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="preparingTime">Temps de préparation</label>
                    <input
                        type="text"
                        id="preparingTime"
                        defaultValue={details?.preparingTime} />
                    {modifiedInfo === 3 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="difficulty">Difficulté</label>
                    <select
                        id="difficulty"
                        defaultValue={details?.difficulty}
                    >
                        <option value="facile" defaultValue={details?.difficulty === "facile" ? true : false}>Facile</option>
                        <option value={"intermédiaire"}
                            defaultValue={details?.difficulty === "intermédiaire" ? true : false}>Intermédiaire</option>
                        <option value="difficile"
                            defaultValue={details?.difficulty === "difficile" ? true : false}>Difficile</option>
                    </select>

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea

                        cols={200}
                        rows={10}
                        id="instructions"
                        defaultValue={details?.instructions}
                    />
                    {modifiedInfo === 4 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="cakeIngredients">Ingrédients du gâteau</label>
                    <textarea

                        cols={200}
                        rows={10}
                        id="cakeIngredients"
                        defaultValue={details?.cakeIngredients}
                    />
                    {modifiedInfo === 5 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="cakeIngredients">Ingrédients du glaçage</label>
                    <textarea

                        cols={200}
                        rows={10}
                        id="icingIngredients"
                        defaultValue={details?.icingIngredients}
                    />
                    {modifiedInfo === 6 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="nbrOfPeople">Pour combien de personnes ?</label>
                    <input type="number"
                        min={1}
                        max={10}
                        id="nbrOfPeople"
                        defaultValue={details?.nbrOfPeople}
                    />
                    {modifiedInfo === 7 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="img">Photo de la recette</label>
                    <input type="file" id="img"
                        ref={imgRef} />
                    {modifiedInfo === 8 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={submit}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}
                </div>
                <div>
                    {feedback && <p>{feedback}</p>}
                </div>
                <div className={styles.buttonContainer}>
                    <button className="btn btn-primary">
                        Retourner aux recettes
                    </button>
                </div>
            </form>
        </div>

    );
}
