import { useContext } from "react";
import styles from "./SmallCards.module.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../context";
import { toggleLikeRecipe } from "../../../../../../api/recipes";

export default function SmallCards({ image, recipeName, idRecipe, handleDeleteFront }) {

    const { user } = useContext(AuthContext);

    const idUser = user.idUser;

    async function handleDislike(idRecipe, idUser) {
        handleDeleteFront(idRecipe);
        await toggleLikeRecipe(idRecipe, idUser);
    }
    return (
        <div className={styles.oneRecipe}>
            <div className={styles.heartContainerMobile}>
                <i onClick={() => handleDislike(idRecipe, idUser)} className="fas fa-heart"></i>
            </div>
            <img src={image} alt="" />
            <div className={styles.showTxt}>
                <div className={styles.heartContainer}>
                    <i onClick={() => handleDislike(idRecipe, idUser)} className="fas fa-heart"></i>
                </div>
                <p>{recipeName}</p>
                <Link to={`/recette/${idRecipe}`} className={`${styles.btnRecipe} btn`}>
                    La recette
                </Link>
                <Link to={`/recette/${idRecipe}`} className={`${styles.btnRecipeTablet} btn`}>
                    {recipeName}
                </Link>
            </div>
        </div>
    );
}
