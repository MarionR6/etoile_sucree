import styles from "./ErrorPage.module.scss";
import cupcakeError from "../../assets/img/cupcakeError.png";

export default function ErrorPage() {
    return (
        <div className={styles.errorPageContainer}>
            <div className={styles.errorElements}>
                <p className={styles.errorMessage}>Erreur 404</p>
                <img src={cupcakeError} alt="Image de cupcake" />
                <p>Une erreur a été rencontrée.</p>
            </div>

        </div>
    );
}
