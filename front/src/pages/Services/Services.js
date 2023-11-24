import Header from '../../components/Header/Header';
import styles from './Services.module.scss';
import imgHeader from "../../assets/img/ServicesImg/services-header.jpg";
import DeliveryImg from "../../assets/img/ServicesImg/services-delivery.jpg";
import caterImg from "../../assets/img/ServicesImg/cater-img.jpg";
import salonImg from "../../assets/img/ServicesImg/salon.jpg";

export default function Services() {
    return (
        <>
            <Header title={"Nos services"} srcImg={imgHeader} />
            <section>
                <article className={styles.deliveryContainer}>
                    <h1 className={styles.serviceTitle}>Livraison</h1>
                    <div className={styles.txtImgContainer}>
                        <div className={`cardBrown ${styles.serviceTxt}`}>
                            <p>Gagnez du temps lors de l’organisation de vos événements en supprimant un trajet ! Vous n’êtes qu’à un appel téléphonique de vous régaler !</p>
                            <p>Profitez de notre livraison offerte dès 100€ d’achat.</p>
                        </div>
                        <div className={styles.serviceImg}>
                            <img src={DeliveryImg} alt="" />
                        </div>
                    </div>
                    <div className={styles.deliveryIcons}>
                        <div className={styles.deliveryOneIcon}>
                            <i className="fa-solid fa-phone-flip"></i>
                            <p>Commande par téléphone</p>
                        </div>
                        <div className={styles.deliveryArrow}>
                            <i className="fa-solid fa-right-long"></i>
                        </div>
                        <div className={styles.deliveryOneIcon}>
                            <i className="fa-solid fa-truck"></i>
                            <p>Un trajet économisé</p>
                        </div>
                        <div className={styles.deliveryArrow}>
                            <i className="fa-solid fa-right-long"></i>
                        </div>
                        <div className={styles.deliveryOneIcon}>
                            <i className="fa-solid fa-box-open"></i>
                            <p>Profitez sans vous déplacer</p>
                        </div>
                    </div>
                </article>
            </section>

            <section className={styles.sectionBrown}>
                <article className={styles.caterArticle}>
                    <div className={styles.txtImgContainer}>
                        <div className={styles.caterTxtTitle}>
                            <h2>Service traiteur</h2>
                            <div className={`cardPink ${styles.caterTxt}`}>
                                <p>À l’Étoile Sucrée, nous mettons un point d’honneur à ce que les événements de nos clients soient au niveau de leurs attente en leur proposant un service traiteur adapté à leurs besoins.</p>

                                <p>Notre carte évolue sans cesse afin d’élargir le champ des possibilités.</p>

                                <p>Vous ne trouvez pas la recette ou le dressage parfait ? Aucun souci, les commandes sont personnalisables afin de répondre à toutes vos attentes !</p>
                            </div>
                        </div>
                        <div className={styles.caterImgContainer}>
                            <img src={caterImg} alt="" />
                        </div>

                    </div>
                </article>
                <article className={styles.caterArticle}>
                    <div className={styles.txtImgContainer} id={styles.salonTxtImgContainer}>
                        <div className={styles.caterTxtTitle}>
                            <h2>Salon de thé</h2>
                            <div className={`cardPink ${styles.caterTxt}`}>
                                <p>Un événement en vue ? N’hésitez pas à nous contacter afin de réserver notre salon de thé ! Une atmosphère chaleureuse pouvant accueillir jusqu’à 30 personnes le temps d’un après-midi.</p>

                                <p>Bénéficiez également une réduction de 10% sur la note finale pour les anniversaires des enfants de 3 à 12 ans !</p>
                            </div>
                        </div>
                        <div className={styles.caterImgContainer}>
                            <img src={salonImg} alt="" />
                        </div>

                    </div>
                </article>
            </section>

        </>
    );
}
