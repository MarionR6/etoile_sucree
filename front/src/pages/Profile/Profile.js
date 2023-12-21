import { useContext, useState } from "react";
import Banner from "../../components/Banner/Banner";
import styles from "./Profile.module.scss";
import { AuthContext } from "../../context";
import { Link, NavLink, Outlet } from "react-router-dom";
import BrownStrip from "../../components/BrownStrip/BrownStrip";
import { logout } from "../../api/users";

export default function Profile() {
    const { user, setUser } = useContext(AuthContext);

    const [showMenu, setShowMenu] = useState(false);

    async function handleDisconnect() {
        await logout();
        setUser(null);
    }

    function toggleMenu(e) { // FUNCTION TO SHOW OR HIDE THE MOBILE MENU
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    return (
        <>
            <Banner />
            <div className={styles.profilePage}>
                {!showMenu && <div className={styles.burgerMenu}>
                    <i class="fa-regular fa-square-caret-right"
                        onClick={(e) => toggleMenu(e)}></i>
                </div>}
                <div className={showMenu ? styles.showMobileNav : styles.mobileNav}>
                    <nav className={styles.burgerNav}>
                        <ul>
                            <li><NavLink end to="/profil" onClick={() => setShowMenu(false)}>Gérer mon profil</NavLink></li>
                            <li><NavLink to="/profil/favoris" onClick={() => setShowMenu(false)}>Recettes favorites</NavLink></li>
                            {user.isAdmin === 1 && (<li><Link to="/admin" onClick={() => setShowMenu(false)}>Zone administrateur</Link></li>)}
                            <li><button className={styles.disconnectButton} onClick={handleDisconnect} ><Link to="/">Déconnexion</Link></button></li>
                            <li><Link to="/profil/modifier-mot-de-passe" onClick={() => setShowMenu(false)}>Modifier le mot de passe</Link></li>
                            <li><Link to="/profil/suppression" onClick={() => setShowMenu(false)}>Supprimer mon compte</Link></li>
                        </ul>
                    </nav>
                    {showMenu && <div className={styles.closeBurgerMenu}>
                        <i class="fa-regular fa-square-caret-left"
                            onClick={(e) => toggleMenu(e)}></i>
                    </div>}
                </div>


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
                                        {user.isAdmin === 1 && (<li><Link to="/admin">Zone administrateur</Link></li>)}
                                        <li><button className={styles.disconnectButton} onClick={handleDisconnect} ><Link to="/">Déconnexion</Link></button></li>
                                        <li><Link to="/profil/modifier-mot-de-passe">Modifier le mot de passe</Link></li>
                                        <li><Link to="/profil/suppression">Supprimer mon compte</Link></li>
                                    </ul>
                                </nav>
                            </div>
                            <div className={`cardBrown ${styles.chosenProfileCategory}`}>
                                <Outlet />
                            </div>
                        </div>
                    </article>

                </section>
            </div >
            <BrownStrip />
        </>
    );
}
