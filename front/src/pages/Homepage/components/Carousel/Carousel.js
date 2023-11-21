import React from 'react';
import Slider from "react-slick";
import "./slick-theme.css";
import "./slick.css";
import styles from "./Carousel.module.scss";
import CarouImg1 from "../../../../assets/img/HomepageImg/Carousel/carrousel-1.jpg";
import CarouImg2 from "../../../../assets/img/HomepageImg/Carousel/carrousel-2.jpg";

export default function Carousel() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true
    };

    return (
        <div className={`${styles.carouselContainer}`}>
            <Slider {...settings}>
                {/* {carouselImgs.map((image) => (
                    <div className={`${styles.oneImage}`}>
                        <img src={image.img} alt={image.alt} />
                    </div>
                ))} */}
                <div className={`${styles.oneImage}`}>
                    <img src={CarouImg1} alt="" />
                </div>
                <div className={`${styles.oneImage}`}>
                    <img src={CarouImg2} alt="" />
                </div>
            </Slider>
        </div>
    );
}
