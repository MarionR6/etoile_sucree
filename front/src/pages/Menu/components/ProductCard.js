import styles from './ProductCard.module.scss';

export default function ProductCard({ recipePrice, srcImage, recipeName, atTheMoment }) {
    return (
        <div className={atTheMoment ? styles.biggerCard : styles.card}>
            <div className={styles.recipePrice}>
                <p>{recipePrice}</p>
            </div>
            <div className={styles.imgContainer}>
                <img src={srcImage} alt="Photo d'un cupcake" />
            </div>
            <div className={styles.recipeName}>
                <p>{recipeName}</p>
            </div>
        </div>
    );
}
