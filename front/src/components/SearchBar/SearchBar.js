import { useState } from "react";
import styles from "./SearchBar.module.scss";

export default function SearchBar({ setFilter, options }) {

    const [selectedOption, setSelectedOption] = useState([]);
    const [searchOptions, setSearchOptions] = useState("");

    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
        console.log(search);
    };

    console.log(options);
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
