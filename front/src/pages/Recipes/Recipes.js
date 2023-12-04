import Header from "../../components/Header/Header";
import styles from "./Recipes.module.scss";
import imgHeader from "../../assets/img/RecipesImg/recipes-header.jpg";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DisplayRecipe from "./components/DisplayRecipe";

export default function Recipes() {

    const [latestRecipe, setLatestRecipe] = useState([]);
    const [allRecipes, setAllRecipes] = useState([]);
    const [displayedRecipe, setDisplayedRecipe] = useState([]);
    const [allRecipesButLatest, setAllRecipesButLatest] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipes`);
                if (response.ok) {
                    const recipesFromBack = await response.json();
                    setLatestRecipe(recipesFromBack.slice(0, 1));
                    setAllRecipes(recipesFromBack);
                    console.log(recipesFromBack);
                    let allRecipesExceptLatest = recipesFromBack.slice(1);
                    setAllRecipesButLatest(allRecipesExceptLatest);
                    setDisplayedRecipe([allRecipesExceptLatest[0]]);
                }
            } catch (error) {
                console.error(error);
            }
            window.scrollTo(0, 0);
        } getRecipes();
    }, []);


    console.log(displayedRecipe);
    const handleShowRecipe = (r) => {
        setDisplayedRecipe([r]);
        console.log(displayedRecipe);
    };

    console.log(displayedRecipe);

    console.log([allRecipesButLatest[0]]);

    // const currentRecipeCakeIngredientsLines = latestRecipe[0]?.cakeIngredients.split("\r\n");
    // const currentRecipeIcingIngredientsLines = latestRecipe[0]?.icingIngredients.split("\r\n");

    return (
        <>
            <Header title={"Nos recettes"} srcImg={imgHeader} />
            <section>
                <article className={styles.currentRecipeContainer}>
                    <h1 className={styles.currentRecipeTitle}>La recette du moment</h1>
                    <DisplayRecipe chosenRecipe={latestRecipe} />
                </article>
            </section>
            <section className={styles.sectionBrown}>
                <article className={styles.currentRecipeContainer}>
                    <h1 className={styles.lightTitle}>
                        Toutes nos recettes pour vous
                    </h1>
                    <div className={styles.flexContainer}>
                        <div className={styles.searchContainer}>
                            <SearchBar setFilter={setFilter} />
                            <div className={styles.recipeNamesContainer}>
                                <ul>
                                    {allRecipesButLatest
                                        .filter((recipe) => recipe.recipeName.toLowerCase().includes(filter))
                                        .map((r, index) => (
                                            <li key={index}><button onClick={() => handleShowRecipe(r)}>{r.recipeName}</button></li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        {console.log(displayedRecipe)}
                        <DisplayRecipe chosenRecipe={displayedRecipe} brownBackground={true} />
                    </div>
                </article>
            </section>
        </>
        //     <section className={styles.sectionBrown}>
        //         <article className={styles.currentRecipeContainer}>
        //             <h1 className={styles.lightTitle}>
        //                 Toutes nos recettes pour vous
        //             </h1>

        //             <div className={styles.flexContainer}>
        //                 <div className={styles.searchContainer}>
        //                     <SearchBar setFilter={setFilter} options={allRecipes} />
        //                     <div className="line-light"></div>
        //                     <div className={styles.recipeNamesContainer}>
        //                         <ul>
        //                             {allRecipes.map((r, index) => (
        //                                 <li key={index}>{r.recipeName}</li>
        //                             ))}

        //                         </ul>
        //                     </div>
        //                 </div>
        //                 <div className={styles.txtImgContainer} id={styles.reversedCategory}>
        //                     <div className={styles.imgContainer}>
        //                         <img src={`http://localhost:8000/${latestRecipe[0]?.img}`} className={styles.currentRecipeImage} id={styles.allRecipesImg} alt="" />
        //                     </div>
        //                     <div className={`cardPink ${styles.txtContainer}`}>
        //                         <div className={styles.heartContainer}>
        //                             <button type="button" id={styles.darkHeart}>
        //                                 <i className="fa-solid fa-heart"></i>
        //                             </button>
        //                         </div>
        //                         <h3>
        //                             {latestRecipe[0]?.recipeName}
        //                         </h3>
        //                         <div className={`line-light ${styles.line}`}></div>
        //                         <div className={styles.currentRecipeInfo}>
        //                             <div className={styles.timeRecipe}>
        //                                 <i className="fa-regular fa-clock"></i>
        //                                 <div>
        //                                     <p>Préparation : {latestRecipe[0]?.preparingTime}</p>
        //                                     <p>Cuisson : {latestRecipe[0]?.cookingTime}</p>
        //                                 </div>
        //                             </div>
        //                             <div className={styles.currentRecipeDifficulty}>
        //                                 {latestRecipe[0]?.difficulty === "facile" && <i className="fa-solid fa-circle-dot"></i>}
        //                                 {latestRecipe[0]?.difficulty === "intermédiaire" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i></>}
        //                                 {latestRecipe[0]?.difficulty === "difficile" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i>
        //                                     <i className="fa-solid fa-circle-dot"></i></>}
        //                                 <p>{latestRecipe[0]?.difficulty}</p>
        //                             </div>
        //                             <div className={styles.currentRecipePeople}>
        //                                 <i className="fa-solid fa-users"></i>
        //                                 <p>
        //                                     {latestRecipe[0]?.nbrOfPeople} {latestRecipe[0]?.nbrofPeople === 1 ? ("personne") : ("personnes")}
        //                                 </p>

        //                             </div>


        //                         </div>
        //                         <div className={styles.ingredientsCurrentRecipe}>
        //                             <h4>
        //                                 Ingrédients
        //                             </h4>
        //                             <div className={styles.ingredientsContainer}>
        //                                 <div className={styles.cupcakeIngredients}>
        //                                     <h5>Pour les cupcakes :</h5>
        //                                     <ul>
        //                                         {currentRecipeCakeIngredientsLines?.map((line, index) => (
        //                                             <li key={index}>
        //                                                 {line}
        //                                             </li>
        //                                         ))}
        //                                     </ul>

        //                                 </div>
        //                                 <div className={styles.cupcakeIngredients}>
        //                                     <h5>Pour le glaçage :</h5>
        //                                     <ul>
        //                                         {currentRecipeIcingIngredientsLines?.map((line, index) => (
        //                                             <li key={index}>
        //                                                 {line}
        //                                             </li>
        //                                         ))}
        //                                     </ul>

        //                                     <button type="button" className="btn btn-secondary">
        //                                         Voir la recette
        //                                     </button>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>

        //         </article>


        //     </section>
        // </>

    );
}
