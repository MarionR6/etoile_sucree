import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import styles from './FormsContainer.module.scss';
import { NavLink, Outlet } from "react-router-dom";

export default function FormsContainer() {
    return (
        <div>
            <Banner />
            <nav className={styles.navForms}>
                <ul>
                    <li>
                        <NavLink className={styles.linkUser} end to="/utilisateur">
                            <h2>
                                Connexion
                            </h2>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={styles.linkUser} to="/utilisateur/inscription">
                            <h2>
                                Inscription
                            </h2>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
            <BrownStrip />
        </div>
    );
}
