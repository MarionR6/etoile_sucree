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
                <button className={styles.closeMenu} type='button' onClick={(e) => toggleMenu(e)}><i class="fa-solid fa-xmark"></i></button>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/"
                    className={styles.linkBurgerMenu}
                >
                    Accueil
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/services"
                    className={styles.linkBurgerMenu}
                >
                    Services
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/carte"
                    className={styles.linkBurgerMenu}
                >
                    La carte
                </Link>
                <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/recettes"
                    className={styles.linkBurgerMenu}
                >
                    Recettes
                </Link>
                {user && <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/profil"
                    className={styles.linkBurgerMenu}
                >
                    Profil
                </Link>}
                {user?.isAdmin === 1 && <Link
                    onClick={(e) => toggleMenu(e)}
                    to="/admin"
                    className={styles.linkBurgerMenu}
                >
                    Zone Admin
                </Link>}
                {user ? (<Link
                    onClick={(e) => {
                        handleDisconnect();
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>

                    Se déconnecter
                </Link>) : (<Link to="/utilisateur"
                    onClick={(e) => {
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>

                    Se connecter
                </Link>)
                }
                {!user && <Link to="/utilisateur/inscription"
                    onClick={(e) => {
                        toggleMenu(e);
                    }}
                    className={styles.linkBurgerMenu}>S'inscrire</Link>}
            </ul>
        </div>
    );
}
