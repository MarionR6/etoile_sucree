import styles from './DisplayRecipe.module.scss';

export default function DisplayRecipe({ chosenRecipe, brownBackground }) {
    const latestRecipeCakeIngredientsLines = chosenRecipe[0]?.cakeIngredients.split("\n");
    const latestRecipeIcingIngredientsLines = chosenRecipe[0]?.icingIngredients.split("\n");
    console.log(chosenRecipe);
    return (
        <div className={styles.displayRecipeContainer}>{chosenRecipe ? (
            <div className={brownBackground ? (`cardPink ${styles.txtContainer}`) : (`cardBrown ${styles.txtContainer}`)}>
                <div className={brownBackground ? `${styles.heartContainer} ${styles.darkHeart}` : styles.heartContainer}>
                    <button type="button">
                        {brownBackground ? <i className="fa-solid fa-heart" style={{ color: "var(--text-color-dark)" }}></i> : <i className="fa-solid fa-heart"></i>}
                    </button>
                </div>
                <h3>
                    {chosenRecipe[0]?.recipeName}
                </h3>
                <div className={styles.imgContainer} id={brownBackground && styles.brownBackgroundImgContainer}>
                    {chosenRecipe[0]?.img && <img src={`http://localhost:8000/${chosenRecipe[0]?.img}`} className={styles.currentRecipeImage} id={brownBackground ? styles.allRecipesImg : undefined} alt="" />} </div>
                <div className={brownBackground ? `line-light ${styles.line}` : `line-dark ${styles.line}`}></div>
                <div className={styles.currentRecipeInfo}>
                    <div className={styles.timeRecipe}>
                        <i className="fa-regular fa-clock"></i>
                        <div>
                            <p>Préparation : {chosenRecipe[0]?.preparingTime}</p>
                            <p>Cuisson : {chosenRecipe[0]?.cookingTime}</p>
                        </div>
                    </div>
                    <div className={styles.currentRecipeDifficulty}>
                        {chosenRecipe[0]?.difficulty === "facile" && <i className="fa-solid fa-circle-dot"></i>}
                        {chosenRecipe[0]?.difficulty === "intermédiaire" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i></>}
                        {chosenRecipe[0]?.difficulty === "difficile" && <><i className="fa-solid fa-circle-dot"></i> <i className="fa-solid fa-circle-dot"></i>
                            <i className="fa-solid fa-circle-dot"></i></>}
                        <p>{chosenRecipe[0]?.difficulty}</p>
                    </div>
                    <div className={styles.currentRecipePeople}>
                        <i className="fa-solid fa-users"></i>
                        <p>
                            {chosenRecipe[0]?.nbrOfPeople} {chosenRecipe[0]?.nbrofPeople === 1 ? ("personne") : ("personnes")}
                        </p>

                    </div>
                </div>
                <button type="button" className={brownBackground ? `btn btn-secondary` : "btn"}>
                    Voir la recette
                </button>
            </div>) : ("")}
        </div>
    );
}
