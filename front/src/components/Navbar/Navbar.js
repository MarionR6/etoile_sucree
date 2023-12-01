import { useContext } from "react";
import Logo from "../../assets/img/Logo.svg";
// import Cupcake from "../../assets/img/nav-cupcake.png";
// import UserIcon from "../../assets/img/user.svg";
import styles from "./Navbar.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { logout } from "../../api/users";

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleDisconnect() {
        await logout();
        setUser(null);
        navigate('/');
    }
    return (
        <header>
            <div className={`${styles.navbar}`}>
                <Link to="/" className={`${styles.logo}`}><img src={Logo} alt="Logo de l'Étoile Sucrée" /></Link>
                <nav>
                    <ul>
                        <li><NavLink end to="/services">Services</NavLink></li>
                        <li><NavLink to="/carte">La carte</NavLink></li>
                        {/* <img src={Cupcake} alt="Logo d'un cupcake rose" /> */}
                        <li><NavLink to="/apropos">À propos</NavLink></li>
                        <li><NavLink to="/recettes">Recettes</NavLink></li>
                    </ul>
                </nav>
                <div className={`${styles.icon}`}>
                    {/* {user ? (<Link to="/profil"><img src={UserIcon} alt="" /></Link>) : (<Link to="/utilisateur"><img src={UserIcon} alt="" /></Link>)} */}
                    {user ? (<div className={styles.buttonsContainer}><Link to="/profil" className={styles.firstButton}>Mon profil</Link>
                        <button onClick={() => handleDisconnect()} type="button">Déconnexion</button></div>) : (<div className={styles.buttonsContainer}><Link to="/utilisateur" className={styles.firstButton}>Se connecter</Link>
                            <Link to="/utilisateur/inscription">S'inscrire</Link></div>)}

                </div>
            </div>
            <div className={styles.burgerMenu}>
                <i className="fa-solid fa-bars"></i>
            </div>
        </header>
    );
}
