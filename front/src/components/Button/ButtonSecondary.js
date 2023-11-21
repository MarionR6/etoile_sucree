import styles from "./ButtonSecondary.module.scss";
export default function Button({ txtButton }) {
    console.log({ txtButton });
    return (
        <button className={styles.btnSecondary}>
            {txtButton}
        </button>
    );
}
