import Banner from "../../components/Banner/Banner";
import BrownStrip from "../../components/BrownStrip/BrownStrip";

export default function Gdpr() {
    return (
        <>
            <Banner />
            <section className={`cardBrown annexePages`}>
                <article>
                    <h1>
                        Politique de protection des données
                    </h1>
                    <p>
                        En utilisant Étoile Sucrée, nous utilisons des données de nature à vous identifier, telles que votre nom, prénom et adresse mail.
                    </p>
                    <p>
                        Ces données revêtent un caractère personnel. Par conséquent, l'objectif du présent document est de vous transmettre les informations requises conformément à l'article 32 de la loi Informatique et Libertés, ainsi qu'à l'article 13 du Règlement (UE) 2016/679 du Parlement européen et du Conseil en date du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, également connu sous le nom de RGPD.
                    </p>
                </article>
                <article>
                    <h1>
                        Responsable du traitement
                    </h1>

                    <p>
                        Le responsable du traitement des données à caractère personnel collectées sur ce site est Étoile Sucrée. Bien que ce site représente une boulangerie fictive, nous prenons la protection de vos données personnelles au sérieux. Les informations que vous fournissez sont traitées conformément aux dispositions de la présente politique de confidentialité.
                    </p>

                </article>

                <article>
                    <h1>
                        Collecte de données à caractère personnel
                    </h1>

                    <p>La définition de la "donnée à caractère personnel" ou "donnée personnelle" englobe toute information se rapportant à une personne physique identifiée ou identifiable.
                        Dans le respect du principe de minimisation, Étoile Sucrée s'engage à collecter uniquement les données personnelles strictement nécessaires à la réalisation des objectifs des traitements mis en place.</p>
                </article>

                <article>
                    <h1>Les cookies</h1>
                    <p>Le Site utilise uniquement des cookies « fonctionnels », nécessaires à son bon fonctionnement. Ces cookies sont déposés automatiquement dès la connexion à votre compte utilisateur sur le Site.</p>
                </article>

                <article>
                    <h1>Sécurité et confidentialité des données</h1>
                    <p>
                        Étoile Sucrée met en oeuvre des mesures techniques de sécurité destinées à garantir la confidentialité et l'intégrité de vos données personnelles contre la perte, le vol ou l'accès non autorisé, mais également contre toute modification ou destruction.
                    </p>
                    <p>Les données sont stockées de manière confidentielle et protégée contre les attaques numériques.</p>
                </article>



            </section>
            <BrownStrip />
        </>

    );
}
