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
                    let allRecipesExceptLatest = recipesFromBack.slice(1);
                    setAllRecipesButLatest(allRecipesExceptLatest);
                    setDisplayedRecipe([allRecipesExceptLatest[0]]);

                    console.log(recipesFromBack);
                }
            } catch (error) {
                console.error(error);
            }
        } getRecipes();
    }, []);


    const handleShowRecipe = (r) => {
        setDisplayedRecipe([r]);
    };

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
                        <div className={styles.chosenRecipeContainer}>
                            <DisplayRecipe chosenRecipe={displayedRecipe} brownBackground={true} />
                        </div>

                    </div>
                </article>
            </section>
        </>
    );
}
