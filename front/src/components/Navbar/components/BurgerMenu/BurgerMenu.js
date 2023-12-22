import styles from './BurgerMenu.module.scss';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from '../../../../api/users';
import { AuthContext } from '../../../../context';

export default function BurgerMenu({ toggleMenu, handleDisconnect }) {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleDisconnect() {
        await logout();
        setUser(null);
        navigate('/');
    }


    return (

        <div>
            <ul className={styles.mobileContainer}>
                <button className={styles.closeMenu} type='button' title="Cliquez pour fermer le menu" onClick={(e) => toggleMenu(e)}><i className="fa-solid fa-xmark"></i></button>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/"
                    title="Cliquez pour accéder à la page d'accueil"
                    className={styles.linkBurgerMenu}
                >
                    Accueil
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/services"
                    title="Cliquez pour accéder à la page services"
                    className={styles.linkBurgerMenu}
                >
                    Services
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/carte"
                    title="Cliquez pour accéder à la page carte"
                    className={styles.linkBurgerMenu}
                >
                    La carte
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/recettes"
                    title="Cliquez pour accéder à la page recettes"
                    className={styles.linkBurgerMenu}
                >
                    Recettes
                </Link>
                {user && <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/profil"
                    title="Cliquez pour accéder à la page de profil"
                    className={styles.linkBurgerMenu}
                >
                    Profil
                </Link>}
                {user?.isAdmin === 1 && <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/admin"
                    title="Cliquez pour accéder à la page administrateur"
                    className={styles.linkBurgerMenu}
                >
                    Zone Admin
                </Link>}
                {user ? (<Link
                    title="Cliquez pour vous déconnecter"
                    onClick={(e) => {
                        handleDisconnect();
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>

                    Se déconnecter
                </Link>) : (<Link to="/utilisateur"
                    title="Cliquez pour accéder à la page de connexion"
                    onClick={(e) => {
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>

                    Se connecter
                </Link>)
                }
                {!user && <Link to="/utilisateur/inscription"
                    title="Cliquez pour accéder à la page d'inscription"
                    onClick={(e) => {
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>S'inscrire</Link>}
            </ul>
        </div>
    );
}
