import { Link } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import BrownStrip from "../../components/BrownStrip/BrownStrip";

export default function TermsOfService() {
    return (
        <>
            <Banner />
            <section className='cardBrown annexePages'>
                <article>
                    <h1>Conditions générales d'utilisation</h1>
                    <p>
                        En accédant et en utilisant le site web "Étoile Sucrée", vous acceptez sans réserve les présentes Conditions Générales d'Utilisation.
                    </p>
                </article>
                <article>
                    <h1>Propriété intellectuelle</h1>
                    <p>Les illustrations et photographies utilisées sont libres de droit et les propriétaires de celles-ci sont créditées dans la page <Link to="/mentions-legales">Mentions Légales</Link>. Le design du Site est la propriété exclusive d'Étoile Sucrée et est protégé par les lois sur la propriété intellectuelle.</p>
                </article>
                <article>
                    <h1>Utilisation de l'application web</h1>
                    <p>Vous êtes autorisé(e) à utiliser le site uniquement à des fins personnelles et non commerciales. Il est interdit de copier, reproduire, distribuer ou exploiter de quelque manière que ce soit le contenu du site sans l'autorisation préalable du propriétaire du site.</p>
                </article>
                <article>
                    <h1>Les recettes</h1>
                    <p>Étoile Sucrée propose des recettes de cupcakes gratuites chaque mois à titre informatif et ludique. Ces recettes sont destinées à un usage personnel, et le Site ne garantit pas les résultars obtenus lors de leur réalisation.</p>
                </article>
                <article>
                    <h1>Responsabilité</h1>
                    <p>Étoile Sucrée ne peut être tenue responsable des dommages directs ou indirects résultant de l'utilisation du site ou de l'application des recettes.</p>
                </article>
                <article>
                    <h1>Collecte des données personnelles</h1>
                    <p>Étoile Sucrée s'engage à respecter la confidentialité de vos données personnelles. Consultez notre Politique de Confidentialité pour en savoir plus sur la manière dont nous collectons, utilisons et protégeons vos informations.</p>
                </article>
                <article>
                    <h1>Contact</h1>
                    <p>Pour toute question ou préoccupation concernant les CGU, veuillez nous contacter à l'adresse <a href="mailto:etoile.sucree.cupcakes@gmail.com">etoile.sucree.cupcakes@gmail.com</a>.</p>
                </article>
            </section>
            <BrownStrip />
        </>
    );
}
