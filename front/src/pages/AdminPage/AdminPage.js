import styles from './AdminPage.module.scss';
import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminPage() {

    return (
        <>
            <Banner />
            <nav className={styles.adminNav}>
                <ul>
                    <li><NavLink end to="/admin">Ajouter une recette</NavLink></li>
                    <li><NavLink to="/admin/gestion-recettes">Gérer les recettes</NavLink></li>
                    <li><NavLink to="/admin/gestion-utilisateurs">Gérer les utilisateurs</NavLink></li>
                </ul>
            </nav>
            <Outlet />
            <BrownStrip />
        </>

    );
}
