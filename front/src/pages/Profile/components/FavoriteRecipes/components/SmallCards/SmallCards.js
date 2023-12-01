import { useContext } from "react";
import styles from "./SmallCards.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../context";

export default function SmallCards({ image, recipeName, idRecipe, handleDeleteFront }) {

    const { user } = useContext(AuthContext);

    const idUser = user.idUser;

    async function handleDislike(idRecipe) {
        console.log("idRecipe", idRecipe);
        const response = await fetch(`http://localhost:8000/api/recipes/dislike/${idUser}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idRecipe }),
        });
        if (response.ok) {
            console.log("Disliked");
            handleDeleteFront(idRecipe);
            // console.log(idRecipe);
        } else {
            throw new Error("Error api recipeDisliked");
        }

    }
    return (
        <div className={styles.oneRecipe}>
            <img src={image} alt="" />
            <div className={styles.showTxt}>
                <div className={styles.heartContainer}>
                    <i onClick={() => handleDislike(idRecipe)} className="fas fa-heart"></i>
                </div>
                <p>{recipeName}</p>
                <Link to="/" className={`${styles.btnRecipe} btn`}>
                    La recette
                </Link>
                <Link to="/" className={`${styles.btnRecipeTablet} btn`}>
                    {recipeName}
                </Link>
            </div>
        </div>
    );
}
