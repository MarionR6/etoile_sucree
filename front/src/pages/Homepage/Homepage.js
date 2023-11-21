import React from 'react';
import Header from '../../components/Header/Header';
import Carousel from './components/Carousel/Carousel';
import styles from "./Homepage.module.scss";
import imgSurPlace from "../../assets/img/HomepageImg/Services/sur-place.jpg";

// Image imports
import HomepageHeader from "../../assets/img/HomepageImg/header.jpg";
import StoryImg from "../../assets/img/HomepageImg/histoire.jpg";
import ServiceCard from './components/Carousel/ServiceCard/ServiceCard';


export default function Homepage() {

    return (
        <>
            <Header srcImg={HomepageHeader} />
            <section>
                <Carousel />
            </section>
            <section className={`${styles.sectionBrown}`}>
                <article className={`${styles.storyContainer}`}>
                    <h1>Notre histoire</h1>
                    <div className={`${styles.txtImgContainer}`}>
                        <div className={`${styles.imgStory}`}>
                            <img src={StoryImg} alt="" />
                        </div>
                        <div className={`line-dark ${styles.lineStory}`}></div>
                        <div className={`cardPink ${styles.txtStory}`}>
                            <p>Notre aventure sucrée a commencé modestement dans une cuisine familiale, avec une passion pour la pâtisserie et une pincée d'amour. Chaque cupcake que nous créons raconte une histoire, celle de notre parcours passionné et des moments doux partagés en famille. Chaque tourbillon de glaçage, chaque garniture délicieuse est le fruit d'un héritage sucré transmis de génération en génération.</p>
                        </div>
                    </div>
                </article>
            </section>

            <section>
                <article className={`${styles.servicesContainer}`}>
                    <h1>Nos services</h1>
                    <ServiceCard servImg={imgSurPlace} title={"Sur place ou à emporter"} servTxt={"Laissez-vous séduire par nos créations, à déguster au sein de notre boutique, ou à emporter afin d’en profiter où que vous alliez !"} isButton={true} txtButton={"Voir la carte"} />
                    <ServiceCard servImg={imgSurPlace} title={"Sur place ou à emporter"} servTxt={"Laissez-vous séduire par nos créations, à déguster au sein de notre boutique, ou à emporter afin d’en profiter où que vous alliez !"} isButton={false} txtButton={"Voir la carte"} />
                </article>
            </section>
        </>
    );
}
