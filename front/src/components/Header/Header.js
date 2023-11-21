import Banner from "../Banner/Banner";
import styles from "./Header.module.scss";

export default function Header({ title, srcImg }) {
    return (
        <>
            <div className={`${styles.header}`} style={{ backgroundImage: `url(${srcImg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <h1>{title}</h1>
            </div>
            <Banner />
        </>
    );
}
