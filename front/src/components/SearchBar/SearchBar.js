import styles from "./SearchBar.module.scss";

export default function SearchBar({ setFilter }) {

    const handleInput = (e) => { // FUNCTION TO GET WHAT THE USER TYPES IN THE SEARCH BAR INPUT
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
    };
    return (
        <div
            className={styles.searchContainer}
        >
            <i className="fas fa-magnifying-glass"></i>
            <input
                onInput={handleInput}
                type="text"
                placeholder="Rechercher une recette"
            />
        </div>
    );
}
