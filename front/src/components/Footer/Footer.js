import styles from './Footer.module.scss';
import logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className={styles.footerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="" />
                </div>
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle}>L'Étoile Sucrée</h2>
                    <p className={styles.footerLines}>7 rue de la Pâtasucre</p>
                    <p className={styles.footerLines}>59110 La Madeleine</p>
                </div>
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle}>Nous contacter</h2>
                    <p className={styles.footerLines}>00.00.00.00.00</p>
                    <a href='mailto:etoile.sucree@gmail.com' className={styles.footerLines}>etoile.sucree@gmail.com</a>
                </div>
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle}>Nous suivre</h2>
                    <p className={styles.footerLines}>Nos réseaux :</p>
                    <div className={styles.iconsContainer}>
                        <i className="fa-brands fa-facebook-f"></i> <i className="fa-brands fa-instagram"></i> <i className="fa-brands fa-pinterest-p"></i><i className="fa-brands fa-tiktok"></i>
                    </div>
                </div>
            </div>
            <div className={styles.legal}>
                <div className={styles.legalContent}>
                    <p>© L’Étoile Sucrée || Tous droits réservés ||&nbsp;</p>
                    <Link to="/">Mentions Légales</Link>
                    <p>&nbsp;||&nbsp;</p>
                    <Link to="/">CGV</Link>
                    <p>&nbsp;||&nbsp;</p>
                    <Link to="/">Politique de confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
