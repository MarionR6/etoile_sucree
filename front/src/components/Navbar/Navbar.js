import { useContext } from "react";
import Logo from "../../assets/img/Logo.svg";
import Cupcake from "../../assets/img/nav-cupcake.png";
import UserIcon from "../../assets/img/user.svg";
import styles from "./Navbar.module.scss";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context";

export default function Navbar() {
    const { user } = useContext(AuthContext);
    return (
        <header>
            <div className={`${styles.navbar}`}>
                <Link to="/" className={`${styles.logo}`}><img src={Logo} alt="Logo de l'Étoile Sucrée" /></Link>
                <nav>
                    <ul>
                        <li><NavLink end to="/services">Services</NavLink></li>
                        <li><NavLink to="/recettes">Recettes</NavLink></li>
                        <img src={Cupcake} alt="Logo d'un cupcake rose" />
                        <li><NavLink to="/carte">La carte</NavLink></li>
                        <li><NavLink to="/apropos">A propos</NavLink></li>
                    </ul>
                </nav>
                <div className={`${styles.icon}`}>
                    {user ? (<Link to="/profil"><img src={UserIcon} alt="" /></Link>) : (<Link to="/utilisateur"><img src={UserIcon} alt="" /></Link>)}

                </div>
            </div>
            <div className={styles.burgerMenu}>
                <i class="fa-solid fa-bars"></i>
            </div>
        </header>
    );
}
