import Header from "../../components/Header/Header";
import styles from "./Recipes.module.scss";
import imgHeader from "../../assets/img/RecipesImg/recipes-header.jpg";
import { useEffect, useState } from "react";

export default function Recipes() {

    const [latestRecipe, setLatestRecipe] = useState([]);

    useEffect(() => {
        async function getLatestRecipe() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipes`);
                if (response.ok) {
                    const recipesFromBack = await response.json();
                    console.log(recipesFromBack);
                    setLatestRecipe(recipesFromBack.slice(0, 1));
                    console.log(latestRecipe);
                }
            } catch (error) {
                console.error(error);
            }
        } getLatestRecipe();
    }, []);

    const currentRecipeCakeIngredientsLines = latestRecipe[0]?.cakeIngredients.split("\r\n");
    const currentRecipeIcingIngredientsLines = latestRecipe[0]?.icingIngredients.split("\r\n");

    return (
        <>
            <Header title={"Nos recettes"} srcImg={imgHeader} />
            <section>
                <article className={styles.currentRecipeContainer}>
                    <h1 className={styles.currentRecipeTitle}>La recette du moment</h1>
                    <div className={styles.txtImgContainer}>
                        <div className={styles.imgContainer}>
                            <img src={`http://localhost:8000/${latestRecipe[0]?.img}`} className={styles.currentRecipeImage} alt="" />
                        </div>
                        <div className={`cardBrown ${styles.txtContainer}`}>
                            <h3>
                                {latestRecipe[0]?.recipeName}
                            </h3>
                            <div className={`line-dark ${styles.line}`}></div>
                            <div className={styles.currentRecipeInfo}>
                                <div className={styles.timeRecipe}>
                                    <i className="fa-regular fa-clock"></i>
                                    <div>
                                        <p>Préparation : {latestRecipe[0]?.preparingTime}</p>
                                        <p>Cuisson : {latestRecipe[0]?.cookingTime}</p>
                                    </div>
                                </div>
                                <div className={styles.currentRecipeDifficulty}>
                                    {latestRecipe[0]?.difficulty == "facile" && <i className="fa-solid fa-circle-dot"></i>}
                                    {latestRecipe[0]?.difficulty == "intermédiaire" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i></>}
                                    {latestRecipe[0]?.difficulty == "difficile" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i>
                                        <i className="fa-solid fa-circle-dot"></i></>}
                                    <p>{latestRecipe[0]?.difficulty}</p>
                                </div>
                                <div className={styles.currentRecipePeople}>
                                    <i className="fa-solid fa-users"></i>
                                    <p>
                                        {latestRecipe[0]?.nbrOfPeople} {latestRecipe[0]?.nbrofPeople === 1 ? ("personne") : ("personnes")}
                                    </p>

                                </div>


                            </div>
                            <div className={styles.ingredientsCurrentRecipe}>
                                <h4>
                                    Ingrédients
                                </h4>
                                <div className={styles.ingredientsContainer}>
                                    <div className={styles.cupcakeIngredients}>
                                        <h5>Pour les cupcakes :</h5>
                                        <ul>
                                            {currentRecipeCakeIngredientsLines?.map((line, index) => (
                                                <li key={index}>
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                    <div className={styles.cupcakeIngredients}>
                                        <h5>Pour le glaçage :</h5>
                                        <ul>
                                            {currentRecipeIcingIngredientsLines?.map((line, index) => (
                                                <li key={index}>
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>

                                        <button type="button">
                                            Voir la recette
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </>

    );
}
