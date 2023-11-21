import ButtonSecondary from "../../../../../components/Button/ButtonSecondary";
import styles from "./ServiceCard.module.scss";
export default function ServiceCard({ servImg, title, servTxt, isButton, txtButton }) {
    return (
        <div className={`cardBrown ${styles.oneService}`}>
            <div className={`${styles.imgContainer}`}>
                <img src={servImg} alt="" />
            </div>
            <div className={`${styles.txtContainer}`}>
                <h2>{title}</h2>
                <div className="line-dark"></div>
                <p className={`${styles.serviceTxt}`}>
                    {servTxt}
                </p>
                {isButton && <ButtonSecondary txtButton={txtButton} />}
            </div>
        </div>
    );
}
