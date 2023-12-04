import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from "./RecipesDetails.module.scss";
import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import { AuthContext } from '../../context';
import { toggleLikeRecipe } from '../../api/recipes';

export default function RecipesDetails() {

    const { user } = useContext(AuthContext);

    const { id } = useParams();

    const idUser = user.idUser;

    const [details, setDetails] = useState();
    const [isLiked, setIsLiked] = useState();

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

    useEffect(() => {
        async function getFavoriteRecipes() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getFaves/${idUser}`);
                if (response.ok) {
                    const favesFromBack = await response.json();
                    const isRecipeLiked = favesFromBack.some((fave) => fave.idRecipe === details?.idRecipe);//Searching through the array "details", testing each element of the array to find whether the details is part of the array, if it is, it sets the liked state to true, if it is not, it is set to false. I am using this in order to render the heart in the recipe display component conditionally
                    setIsLiked(isRecipeLiked);
                }
            } catch (error) {
                console.error(error);
            }
        } getFavoriteRecipes(idUser);
    }, [idUser, details]);

    const handleLike = async (id, idUser) => {
        setIsLiked(!isLiked);
        await toggleLikeRecipe(id, idUser);
    };

    const cakeIngredientsLines = details?.cakeIngredients.split("\r");
    const icingIngredientsLines = details?.icingIngredients.split("\r");
    const instructionsLines = details?.instructions.split("\r");

    return (
        <>
            <Banner />
            {details ? (<section>
                <article className={`${styles.recipeArticle} cardBrown`}>
                    <div className={styles.heartContainer}>
                        <button type="button" onClick={() => handleLike(details.idRecipe, idUser)}>
                            {!isLiked ? (<i className="fa-regular fa-heart"></i>) : (<i className="fa-solid fa-heart"></i>)}
                        </button>
                    </div>
                    <h2 className={styles.recipeTitle}>{details?.recipeName}</h2>
                    <div className={`line-dark ${styles.line}`}></div>
                    <div className={styles.recipeContent}>
                        <div className={styles.imgContainer}>
                            <img src={`http://localhost:8000/${details?.img}`} alt="" />
                        </div>
                        <div className={styles.txtContainer}>
                            <div className={styles.infoContainer}>
                                <div className={styles.time}>
                                    <i className="fa-regular fa-clock"></i>
                                    <div>
                                        <p>Préparation : {details?.preparingTime}</p>
                                        <p>Cuisson : {details?.cookingTime}</p>
                                    </div>
                                </div>

                                <div className={styles.difficulty}>
                                    <div className={styles.difficultyDots}>
                                        {details?.difficulty === "facile" && <i className="fa-solid fa-circle-dot"></i>}
                                        {details?.difficulty === "intermédiaire" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i></>}
                                        {details?.difficulty === "difficile" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i>
                                            <i className="fa-solid fa-circle-dot"></i></>}
                                    </div>

                                    <p>{details?.difficulty}</p>
                                </div>

                                <div className={styles.nbrOfPeople}>
                                    <i className="fa-solid fa-users"></i>
                                    <p>
                                        {details?.nbrOfPeople} {details?.nbrofPeople === 1 ? ("personne") : ("personnes")}
                                    </p>
                                </div>

                            </div>
                            <div className={styles.ingredients}>
                                <h3 className={styles.categoryTitle}>Ingrédients</h3>
                                <div className={styles.flexIngredients}>
                                    <div className={styles.ingredientsPart}>
                                        <h4 className={styles.ingredientsSubtitle}>Ingrédients pour la pâte :</h4>
                                        <ul>
                                            {cakeIngredientsLines?.map((ingredient, index) => (
                                                ingredient !== "\n" && <li key={index}>{ingredient}</li>

                                            ))}
                                        </ul>

                                    </div>
                                    <div className={styles.ingredientsPart}>
                                        <h4 className={styles.ingredientsSubtitle}>Ingrédients pour le glaçage :</h4>
                                        <ul>
                                            {icingIngredientsLines?.map((ingredient, index) => (
                                                ingredient !== "\n" && <li key={index}>{ingredient}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.instructions}>
                                <h3 className={styles.categoryTitle}>Instructions</h3>
                                <ul>
                                    {instructionsLines?.map((instruction, index) => (

                                        instruction !== "\n" && <li key={index}>{instruction}</li>
                                    ))}
                                </ul>
                                <p className={styles.ending}>Bon appétit !</p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>) : ("")}

            <BrownStrip />
        </>
    );
}
