import styles from './Footer.module.scss';
import logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className={styles.footerContainer}>
                {/* <div className={styles.logoContainer}>
                    <img src={logo} alt="" />
                </div> */}
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle}>L'Étoile Sucrée</h2>
                    <p className={styles.footerLines}>7 rue de la Pâtasucre</p>
                    <p className={styles.footerLines}>59110 La Madeleine</p>
                </div>
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle}>Nous contacter</h2>
                    <a href='tel:0000000000' className={styles.footerLines}>00.00.00.00.00</a>
                    <a href='mailto:etoile.sucree@gmail.com' className={styles.footerLines}>etoile.sucree@gmail.com</a>
                </div>
                <div className={styles.footerCategory}>
                    <h2 className={styles.footerTitle} id={styles.socialTitle}>Nous suivre</h2>
                    <p className={styles.footerLines} id={styles.socialSubtitle}>Nos réseaux :</p>
                    <div className={styles.iconsContainer}>
                        <a href="https://www.facebook.com/" target='_blank'><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/" target='_blank'><i className="fa-brands fa-instagram"></i></a>
                        <a href="https://www.pinterest.fr/" target='_blank'><i className="fa-brands fa-pinterest-p"></i></a>
                        <a href="https://www.tiktok.com/fr/" target='_blank'><i className="fa-brands fa-tiktok"></i></a>
                    </div>
                </div>
            </div>
            <div className={styles.legal}>
                <div className={styles.legalContent}>
                    <div className={styles.legalName}>
                        <p id={styles.legalName}>© L’Étoile Sucrée || Tous droits réservés <span id={styles.legalNameBars}>||&nbsp;</span></p>

                    </div>
                    <div className={styles.legalLinks}>
                        <Link to="/">Mentions Légales</Link>
                        <p>&nbsp;||&nbsp;</p>
                        <Link to="/">CGU</Link>
                        <p>&nbsp;||&nbsp;</p>
                        <Link to="/">Politique de confidentialité</Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
