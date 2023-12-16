import ButtonSecondary from "../../../../components/Button/ButtonSecondary";
import styles from "./ServiceCard.module.scss";
import { Link } from "react-router-dom";

export default function ServiceCard({ servImg, title, servTxt, isButton, txtButton, isReversed, linkContent, altImg, titleButton }) {
    return (
        <div className={isReversed ? (`cardBrown ${styles.oneService} ${styles.reverseCard}`) : (`cardBrown ${styles.oneService}`)}>
            <div className={`${styles.imgContainer}`}>
                <img src={servImg} alt={altImg} />
            </div>
            <div className={`${styles.txtContainer}`}>
                <h2>{title}</h2>
                <div className={`line-dark ${styles.servicesLine}`}></div>
                <p className={`${styles.serviceTxt}`}>
                    {servTxt}
                </p>
                {isButton && <Link title={titleButton} to={linkContent}><ButtonSecondary txtButton={txtButton} /></Link>}
            </div>
        </div>
    );
}
