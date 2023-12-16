import styles from './AdminPage.module.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Banner from '../../components/Banner/Banner';
import BrownStrip from '../../components/BrownStrip/BrownStrip';
import { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminPage() {

    const imgRef = useRef();
    const [errorImg, setErrorImg] = useState("");
    const [feedbackGood, setFeedbackGood] = useState("");
    const [feedback, setFeedback] = useState("");

    const defaultValues = {
        recipeName: "",
        cookingTime: "",
        preparingTime: "",
        difficulty: "facile",
        instructions: "",
        img: "",
        cakeIngredients: "",
        icingIngredients: "",
        nbrOfPeople: 4
    };

    const recipeSchema = yup.object({
        recipeName: yup
            .string()
            .required("Ce champ est obligatoire"),
        cookingTime: yup
            .string()
            .required("Ce champ est obligatoire"),
        preparingTime: yup
            .string()
            .required("Ce champ est obligatoire"),
        difficulty: yup
            .string()
            .required("Ce champ est obligatoire"),
        instructions: yup
            .string()
            .required("Ce champ est obligatoire"),
        cakeIngredients: yup
            .string()
            .required("Ce champ est obligatoire"),
        icingIngredients: yup
            .string()
            .required("Ce champ est obligatoire"),
        nbrOfPeople: yup
            .number()
            .required("Ce champ est obligatoire")
    });

    const {
        formState: { errors },
        register,
        handleSubmit,
        reset,
        getValues,
        clearErrors,
    } = useForm({
        defaultValues,
        mode: "onChange",
        resolver: yupResolver(recipeSchema),
    });

    async function submit() {
        const values = getValues();
        const formData = new FormData();
        formData.append("recipeName", values.recipeName);
        formData.append("cookingTime", values.cookingTime);
        formData.append("preparingTime", values.preparingTime);
        formData.append("difficulty", values.difficulty);
        formData.append("instructions", values.instructions);
        formData.append("cakeIngredients", values.cakeIngredients);
        formData.append("icingIngredients", values.icingIngredients);
        formData.append("nbrOfPeople", values.nbrOfPeople);

        if (imgRef.current && imgRef.current.files[0]) {
            const maxFileSize = 200000;
            if (imgRef.current.files[0].size > maxFileSize) {
                setErrorImg("Le fichier est trop volumineux, celui-ci ne doit pas dépasser 9Mo.");
                return;
            }
            const supportedExtensions = ["jpg", "jpeg", "png", "webp", "avif"];
            const fileExtension = imgRef.current.files[0].name.split(".").pop().toLowerCase();
            if (!supportedExtensions.includes(fileExtension)) {
                setErrorImg("Format de fichier non supporté.");
                return;
            }
            formData.append("img", imgRef.current.files[0]);
        }
        const response = await fetch("http://localhost:8000/api/recipes/addRecipe", {
            method: "POST",
            body: formData,
        });
        if (response.ok) {
            const newRecipe = await response.json();
            if (newRecipe.message) {
                setFeedback(newRecipe.message);

            } else {
                setFeedbackGood(newRecipe.messageGood);
                reset(defaultValues);
                setTimeout(() => {
                    setFeedbackGood("");
                });
            }
        }

    }

    return (
        <>
            <Banner />
            <nav className={styles.adminNav}>
                <ul>
                    <li><NavLink end to="/admin">Ajouter une recette</NavLink></li>
                    <li><NavLink to="/admin/gestion-recettes">Gérer les recettes</NavLink></li>
                    <li><NavLink to="/admin/gestion-utilisateurs">Gérer les utilisateurs</NavLink></li>
                </ul>
            </nav>
            <Outlet />
            <BrownStrip />
        </>

    );
}
