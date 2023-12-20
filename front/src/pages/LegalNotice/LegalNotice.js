import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import styles from './LegalNotice.module.scss';
import { useState } from 'react';

export default function LegalNotice() {

    const [showCredits, setShowCredits] = useState(false);

    return (
        <>
            <Banner />
            <section className='cardBrown annexePages'>
                <article>
                    <h1>Mentions légales</h1>
                    <p>
                        En accord avec les dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004, connue sous le nom de Loi pour la Confiance dans l’économie numérique (LCEN), les présentes mentions légales sont fournies aux utilisateurs et visiteurs du site Étoile Sucrée, désignés ci-après comme "Utilisateur". L'utilisation et la navigation sur le site par l’Utilisateur entraînent une acceptation totale et sans réserve des présentes mentions légales.
                    </p>
                </article>
                <article>
                    <h1>L'éditeur</h1>
                    <p>Le site Étoile Sucrée est édité par : Mme RENUY Marion</p>
                    <p>Contact : <a href="mailto:marionrenuy@gmail.com">marionrenuy@gmail.com</a></p>
                    <p>Ci-après l'"Éditeur".</p>
                </article>

                <article>
                    <h1>L'hébergeur</h1>
                    <p>L'hébergeur du Site est la société Vercel Inc., dont le siège social est situé au : 440 N Barranca Ave #4133, Covina, CA 91723.</p>
                </article>
                <article>
                    <h1>L'accès au Site</h1>
                    <p>Le site est accessible en tout endroit et à tout moment, sauf cas de force majeur, interruption programmée ou non et pouvant amener ou découlant d'une nécessité de maintenance.</p>
                    <p>En cas de d'interruption ou de suspension du Site, l'Éditeur de saut être tenu responsable.</p>
                </article>
                <article>
                    <h1>Contenu et crédits</h1>
                    <p>Les images présentes sur le site sont toutes libres de droit.</p>
                    {showCredits &&
                        <div>
                            <ul>
                                <li>Image d'en-tête de la page d'accueil réalisée avec l'intelligence artificielle "Kive".</li>
                                <li>Logo de l'application réalisé par l'Éditeur sur le site "Canva".</li>
                                <li>Favicon réalisée par Surang et disponible sur le site "Flaticon".</li>
                                <li>Image sucettes du caroussel page d'accueil tirée du site "Pixabay".</li>
                                <li>Image d'en-tête de la page carte, photographie de la recette "cupcake aux noix" tirées du site "Pexels".</li>
                                <li>La totalité des autres images proviennent du site "Unsplash".</li>
                            </ul>
                        </div>
                    }
                    <button
                        type='button'
                        title='Cliquez pour afficher les crédits photos'
                        className='btn'
                        onClick={() => setShowCredits(!showCredits)}>{showCredits ? "Cacher" : "Voir les crédits"}</button>
                </article>
            </section>
            <BrownStrip />
        </>
    );
}
