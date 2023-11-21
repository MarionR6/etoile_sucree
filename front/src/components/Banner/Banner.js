import styles from "./Banner.module.scss";

export default function Banner() {
    return (
        <div className={`${styles.banner}`}>
            <div className={`line-dark ${styles.bannerLine}`}></div>
            <h1>L'Étoile Sucrée</h1>
            <div className={`line-dark ${styles.bannerLine}`}></div>
        </div>
    );
}
