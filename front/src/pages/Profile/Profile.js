import { useContext } from "react";
import Banner from "../../components/Banner/Banner";
import styles from "./Profile.module.scss";
import { AuthContext } from "../../context";
import { Link, NavLink, Outlet } from "react-router-dom";
import BrownStrip from "../../components/BrownStrip/BrownStrip";
import { logout } from "../../api/users";

export default function Profile() {
    const { user, setUser } = useContext(AuthContext);

    async function handleDisconnect() {
        await logout();
        setUser(null);
    }

    return (
        <>
            <Banner />
            <section className={styles.profileSection}>
                <article className={styles.profileContainer}>
                    <h1 className={styles.welcomeTitle}>Bienvenue {user?.firstname}</h1>
                    <div className={styles.mainContainer}>
                        <div className={`${styles.navContainer} cardBrown`}>
                            <h2 className={styles.subContainerTitle}>Mon profil</h2>
                            <nav>
                                <ul>
                                    <li><NavLink end to="/profil">Gérer mon profil</NavLink></li>
                                    <li><NavLink to="/profil/favoris">Recettes favorites</NavLink></li>
                                </ul>
                                <div className={`${styles.line} line-dark`}></div>
                                <ul>
                                    <li><button className={styles.disconnectButton} onClick={handleDisconnect} ><Link to="/">Déconnexion</Link></button></li>
                                    <li><Link>Supprimer mon compte</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className={`cardBrown ${styles.chosenProfileCategory}`}>
                            <Outlet />
                        </div>
                    </div>
                </article>

            </section>
            <BrownStrip />
        </>
    );
}
