import ButtonSecondary from "../../../../components/Button/ButtonSecondary";
import styles from "./ServiceCard.module.scss";
import { Link } from "react-router-dom";

export default function ServiceCard({ servImg, title, servTxt, isButton, txtButton, isReversed, linkContent }) {
    return (
        <div className={isReversed ? (`cardBrown ${styles.oneService} ${styles.reverseCard}`) : (`cardBrown ${styles.oneService}`)}>
            <div className={`${styles.imgContainer}`}>
                <img src={servImg} alt="" />
            </div>
            <div className={`${styles.txtContainer}`}>
                <h2>{title}</h2>
                <div className="line-dark"></div>
                <p className={`${styles.serviceTxt}`}>
                    {servTxt}
                </p>
                {isButton && <Link to={linkContent}><ButtonSecondary txtButton={txtButton} /></Link>}
            </div>
        </div>
    );
}
