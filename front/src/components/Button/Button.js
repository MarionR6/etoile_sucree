import styles from "./Button.module.scss";
export default function Button({ txtButton }) {
    console.log({ txtButton });
    return (
        <button className="btn">
            {txtButton}
        </button>
    );
}
