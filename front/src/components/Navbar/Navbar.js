import { useContext, useState } from "react";
import Logo from "../../assets/img/Logo.svg";
// import Cupcake from "../../assets/img/nav-cupcake.png";
// import UserIcon from "../../assets/img/user.svg";
import styles from "./Navbar.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { logout } from "../../api/users";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    async function handleDisconnect() {
        await logout();
        setUser(null);
        navigate('/');
    }

    function toggleMenu(e) {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    return (
        <header>
            <div className={`${styles.navbar}`}>
                <Link to="/" className={`${styles.logo}`}><img src={Logo} alt="Logo de l'Étoile Sucrée" /></Link>
                <nav>
                    <ul>
                        <li><NavLink end to="/services">Services</NavLink></li>
                        <li><NavLink to="/carte">La carte</NavLink></li>
                        <li><NavLink to="/recettes">Recettes</NavLink></li>
                    </ul>
                </nav>
                <div className={`${styles.userButtons}`}>
                    {user ? (
                        <div className={styles.buttonsContainer}>
                            <Link to="/profil" className={styles.firstButton}>Mon profil</Link>
                            <button
                                onClick={() => handleDisconnect()} type="button">Déconnexion</button>
                        </div>) : (<div className={styles.buttonsContainer}>
                            <Link to="/utilisateur" className={styles.firstButton}>Se connecter</Link>
                            <Link to="/utilisateur/inscription">S'inscrire</Link>
                        </div>)}

                </div>
            </div>
            <div className={styles.burgerMenu}>
                <i className="fa-solid fa-bars"
                    onClick={(e) => toggleMenu(e)}></i>
            </div>

            <div className={showMenu ? styles.showMobileMenuContainer : styles.mobileMenuContainer}>
                {showMenu && (<BurgerMenu toggleMenu={toggleMenu} handleDisconnect={handleDisconnect} />)}
            </div>

        </header>
    );
}
