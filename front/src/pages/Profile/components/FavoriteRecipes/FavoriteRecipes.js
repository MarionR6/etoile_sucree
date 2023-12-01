import { useContext, useEffect, useState } from 'react';
import styles from "./FavoriteRecipes.module.scss";
import { AuthContext } from '../../../../context';
import SmallCards from './components/SmallCards/SmallCards';

export default function FavoriteRecipes() {

    const { user } = useContext(AuthContext);

    const userId = user.idUser;

    const [usersFaves, setUsersFaves] = useState([]);

    useEffect(() => {
        async function getFavoriteRecipes() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getFaves/${userId}`);

                if (response.ok) {
                    const favesFromBack = await response.json();
                    setUsersFaves(favesFromBack);
                }

            } catch (error) {
                console.error(error);
            }
        } getFavoriteRecipes(userId);
    }, [userId]);

    const handleDeleteFront = (id) => {
        console.log("id sent", id);
        setUsersFaves(usersFaves.filter((oneRecipe) => oneRecipe.idRecipe !== id));
        console.log("usersFaves array", usersFaves);
    };

    return (
        <div className={styles.chosenCategory}>
            <h1 className={styles.chosenCategoryTitle}>Mes recettes préférées</h1>
            <div className={styles.recipesContainer}>
                {usersFaves.map((r, index) => (
                    <SmallCards key={index} image={`http://localhost:8000/${r.img}`} recipeName={r.recipeName} idRecipe={r.idRecipe} handleDeleteFront={handleDeleteFront} />
                ))}
            </div>
        </div>
    );
}
