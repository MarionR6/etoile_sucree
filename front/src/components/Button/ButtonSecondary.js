import styles from "./ButtonSecondary.module.scss";
export default function ButtonSecondary({ txtButton }) {
    return (
        <button className={styles.btnSecondary}>
            {txtButton}
        </button>
    );
}
