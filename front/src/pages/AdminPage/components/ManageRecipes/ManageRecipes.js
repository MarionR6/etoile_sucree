import { useState, useEffect } from 'react';
import styles from "./ManageRecipes.module.scss";
import { deleteRecipe } from '../../../../api/recipes';
import { Link } from 'react-router-dom';
import Modal from '../../../../components/Modal/Modal';

export default function ManageRecipes() {

    const [allRecipes, setAllRecipes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState();

    useEffect(() => {
        async function getRecipes() {
            try {
                const response = await fetch(`http://localhost:8000/api/recipes/getRecipes`);
                if (response.ok) {
                    const recipesFromBack = await response.json();
                    const orderedRecipes = recipesFromBack.sort(function (a, b) {
                        if (a.recipeName.toUpperCase() < b.recipeName.toUpperCase()) {
                            return -1;
                        } else if (a.recipeName > b.recipeName) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    setAllRecipes(recipesFromBack);
                }
            } catch (error) {
                console.error(error);
            }
        } getRecipes();
    }, []);

    const handleDelete = (idRecipe) => { // FUNCTION USED TO SHOW THE POP UP TO CONFIRM THE CHOICE
        setShowModal(true);
        setIdToDelete(idRecipe);
    };

    const handleCancelDelete = () => { // CLOSE THE POP UP AND CANCELS THE DELETION
        setShowModal(false);
    };

    const handleDeleteFront = (id) => { // FUNCTION TO REMOVE THE RECIPE FROM THE FRONTEND ONCE IT GETS DELETED
        setAllRecipes(allRecipes.filter((oneRecipe) => oneRecipe.idRecipe !== id));
    };

    const handleConfirmDelete = async () => { // FUNCTION TO CONFIRM THE DELETION, CALLS FOR THE BACKEND REQUEST AND TRIGGERS THE DELETION IN FRONT
        await deleteRecipe(idToDelete);
        handleDeleteFront(idToDelete);
        setShowModal(false);
    };

    return (
        <div className={styles.recipesTableContainer}>
            <table className='cardBrown'>
                <thead>
                    <tr>
                        <th>Nom de la recette</th>
                        <th id={styles.imgColumn}>Image</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {allRecipes.map((r, index) => (
                        <tr key={index}>
                            <td>{r.recipeName}</td>
                            <td className={styles.imgContainer}><img src={`http://localhost:8000/${r.img}`} alt='Cupcake' /></td>
                            <td className={styles.buttonContainer}>
                                <button
                                    type='button'
                                >
                                    <Link to={`/admin/modifier-recette/${r.idRecipe}`}
                                        title="Cliquez pour modifier la recette">
                                        <i className="fa-solid fa-pen"></i>
                                    </Link>
                                </button>
                            </td>
                            <td className={styles.buttonContainer}>
                                <button
                                    type='button'
                                    onClick={() => handleDelete(r.idRecipe)}
                                    title="Cliquez pour supprimer la recette">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <Modal message="Souhaitez-vous vraiment supprimer cette recette ? Cette action est irréversible."
                onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />}
        </div>
    );
}
