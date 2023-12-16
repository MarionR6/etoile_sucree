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
    const [sentValues, setSentValues] = useState([]);
    const [sentImage, setSentImage] = useState();

    useEffect(() => {
        async function getRecipeDetails() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipeDetails/${id}`);
                if (response.ok) {
                    const detailsFromBack = await response.json();
                    setDetails(detailsFromBack[0]);
                }
            } catch (error) {
                console.error(error);
            }
        } getRecipeDetails();
    }, []);

    const handleShowPen = (n) => {
        setModifiedInfo(n);
    };

    const changeValue = (e, choice) => {
        let value = e.target.value;
        let values = { value, choice };
        setSentValues(values);

    };

    async function submit(sentValues) {
        const response = await fetch(`http://localhost:8000/api/recipes/modifyRecipe/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sentValues)
        });
        if (response.ok) {
            setFeedback("Recette modifiée avec succès.");
            setModifiedInfo(null);
        }
    }

    const changeImage = (e, choice) => {
        let value = e.target.files;
        let values = { value, choice };
        setSentImage(values);
    };

    async function submitImage(sentImage) {
        const formData = new FormData();

        if (imgRef.current && imgRef.current.files[0]) {
            const maxFileSize = 200000;
            if (imgRef.current.files[0].size > maxFileSize) {
                setErrorImg("Le fichier est trop volumineux, celui-ci ne doit pas dépasser 9Mo.");
                return;
            }
            const supportedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
            const fileExtension = imgRef.current.files[0].name.split(".").pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorImg("Format de fichier non supporté.");
                return;
            }
            formData.append("img", imgRef.current.files[0]);
            formData.append("choice", sentImage.choice);
        }
        const response = await fetch(`http://localhost:8000/api/recipes/modifyRecipe/${id}`, {
            method: "PATCH",
            body: formData,
        });
        if (response.ok) {
            setFeedback("Recette modifiée avec succès.");
        }

    }

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
                        onFocus={() => handleShowPen(1)}
                        onChange={(e) => changeValue(e, "recipeName")}
                        defaultValue={details?.recipeName} />
                    {modifiedInfo === 1 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="cookingTime">Temps de cuisson</label>
                    <input
                        onFocus={() => handleShowPen(2)}
                        onChange={(e) => changeValue(e, "cookingTime")}
                        type="text"
                        id="cookingTime"
                        defaultValue={details?.cookingTime} />
                    {modifiedInfo === 2 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}
                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="preparingTime">Temps de préparation</label>
                    <input
                        type="text"
                        id="preparingTime"
                        onFocus={() => handleShowPen(3)}
                        onChange={(e) => changeValue(e, "preparingTime")}
                        defaultValue={details?.preparingTime} />
                    {modifiedInfo === 3 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="difficulty">Difficulté</label>
                    <select
                        id="difficulty"
                        defaultValue={details?.difficulty}
                        onFocus={() => handleShowPen(4)}
                        onChange={(e) => changeValue(e, "difficulty")}
                    >
                        <option value="facile"
                            defaultValue={details?.difficulty === "facile" ? true : false}>Facile</option>
                        <option value={"intermédiaire"}
                            defaultValue={details?.difficulty === "intermédiaire" ? true : false}>Intermédiaire</option>
                        <option value="difficile"
                            defaultValue={details?.difficulty === "difficile" ? true : false}>Difficile</option>

                    </select>
                    {modifiedInfo === 4 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="instructions">Instructions</label>
                    <textarea

                        cols={200}
                        rows={10}
                        id="instructions"
                        defaultValue={details?.instructions}
                        onFocus={() => handleShowPen(5)}
                        onChange={(e) => changeValue(e, "instructions")}
                    />
                    {modifiedInfo === 5 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
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
                        onFocus={() => handleShowPen(6)}
                        onChange={(e) => changeValue(e, "cakeIngredients")}
                    />
                    {modifiedInfo === 6 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
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
                        onFocus={() => handleShowPen(7)}
                        onChange={(e) => changeValue(e, "icingIngredients")}
                    />
                    {modifiedInfo === 7 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
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
                        onFocus={() => handleShowPen(8)}
                        onChange={(e) => changeValue(e, "nbrOfPeople")}
                    />
                    {modifiedInfo === 8 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submit(sentValues)}><i className="fa-regular fa-circle-check"></i></button>
                        <button type='button'><i className="fa-regular fa-circle-xmark"></i></button>
                    </div>}

                </div>
                <div className={styles.oneFormElement}>
                    <label htmlFor="img">Photo de la recette</label>
                    <input type="file" id="img"
                        ref={imgRef}
                        onFocus={() => handleShowPen(9)}
                        onChange={(e) => changeImage(e, "img")} />
                    {modifiedInfo === 9 && <div className={styles.buttonContainer}>
                        <button type='button'
                            onClick={() => submitImage(sentImage)}><i className="fa-regular fa-circle-check"></i></button>
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
