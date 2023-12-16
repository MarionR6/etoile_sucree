import styles from "./Button.module.scss";
export default function Button({ txtButton }) {
    return (
        <button className="btn">
            {txtButton}
        </button>
    );
}
