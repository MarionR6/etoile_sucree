import styles from "./Menu.module.scss";
import { useEffect } from "react";
import Header from "../../components/Header/Header";
import HeaderImg from "../../assets/img/MenuImg/Header_img.jpg";
import ProductCard from "./components/ProductCard";
import RedVelvetImg from "../../assets/img/MenuImg/RedVelvet.jpg";
import ChocoMenthe from "../../assets/img/MenuImg/ChocoMenthe.jpg";
import Chocolat from "../../assets/img/MenuImg/chocolat.jpg";
import Praline from "../../assets/img/MenuImg/praline.jpg";
import ChocoBiscuit from "../../assets/img/MenuImg/choco-biscuit.jpg";
import MacaronFraise from "../../assets/img/MenuImg/MacaronFraise.jpg";
import Licorne from "../../assets/img/MenuImg/Licorne.jpg";
import Mocha from "../../assets/img/MenuImg/Mocha.jpg";
import Rose from "../../assets/img/MenuImg/Rose.jpg";
import Pistache from "../../assets/img/MenuImg/Pistache.jpg";
import ChocoCerise from "../../assets/img/MenuImg/ChocoCerise.jpg";
import Citron from "../../assets/img/MenuImg/Citron.jpg";
import ChocoChataigne from "../../assets/img/MenuImg/ChocoChataigne.jpg";
import PainDEpice from "../../assets/img/MenuImg/pain-depice.jpg";
import RocherNoisette from "../../assets/img/MenuImg/RocherNoisette.jpg";
import BrownStrip from "../../components/BrownStrip/BrownStrip";

export default function Menu() {

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <>
            <Header title={"La carte"} srcImg={HeaderImg} />
            <section>
                <div className={styles.articlesContainer}>
                    <article className={styles.onePartMenu}>
                        <h1>Nos cupcakes</h1>
                        <div className={styles.products}>
                            <div className={styles.oneColumnProducts}>
                                <ProductCard recipePrice={"5€"} srcImage={RedVelvetImg} recipeName={"Red Velvet"} />
                                <ProductCard
                                    recipePrice={"4€"}
                                    srcImage={ChocoMenthe}
                                    recipeName={"Choco-Menthe"} />
                                <ProductCard recipePrice={"4€"} srcImage={Chocolat} recipeName={"Chocolat"} />
                                <ProductCard
                                    recipePrice={"5€"}
                                    srcImage={Mocha}
                                    recipeName={"Mocha"} />
                                <ProductCard recipePrice={"5€"} srcImage={Praline} recipeName={"Praline"} />
                                <ProductCard
                                    recipePrice={"5€"}
                                    srcImage={Rose}
                                    recipeName={"Rose"} />
                                <ProductCard recipePrice={"6€"} srcImage={ChocoBiscuit} recipeName={"Choco Biscuit"} />
                                <ProductCard
                                    recipePrice={"4€"}
                                    srcImage={Pistache}
                                    recipeName={"Pistache"} />
                                <ProductCard recipePrice={"7€"} srcImage={MacaronFraise} recipeName={"Macaron Fraise"} />
                                <ProductCard
                                    recipePrice={"5€"}
                                    srcImage={ChocoCerise}
                                    recipeName={"Choco-Cerise"} />
                                <ProductCard recipePrice={"7€"} srcImage={Licorne} recipeName={"Licorne"} />
                                <ProductCard
                                    recipePrice={"4€"}
                                    srcImage={Citron}
                                    recipeName={"Citron"} />
                            </div>
                        </div>
                    </article>
                    <article className={styles.onePartMenu}>
                        <h1>En ce moment</h1>
                        <div className={styles.products} id={styles.rightNow}>
                            <div className={styles.threeProducts}>
                                <ProductCard
                                    recipePrice={"6€"}
                                    srcImage={ChocoChataigne}
                                    recipeName={"Choco-Châtaigne"}
                                    atTheMoment={true} />
                                <ProductCard
                                    recipePrice={"5€"}
                                    srcImage={PainDEpice}
                                    recipeName={"Pain d'épice"}
                                    atTheMoment={true} />
                                <ProductCard
                                    recipePrice={"7€"}
                                    srcImage={RocherNoisette}
                                    recipeName={"Rocher Noisette"}
                                    atTheMoment={true} />
                            </div>
                            <div className={styles.message}>
                                <p>Joyeuses Fêtes !</p>
                            </div>
                        </div>
                        <h1 id={styles.twoLinesTitle}>Demandez notre cupcake du jour!</h1>
                    </article>
                </div>
            </section>
            <BrownStrip />
        </>
    );
}
