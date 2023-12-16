import { useContext, useState } from 'react';
import styles from './DeleteAccount.module.scss';
import { AuthContext } from '../../../../context';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../api/users';

export default function DeleteAccount() {

    const { user, setUser } = useContext(AuthContext);

    const [feedbackGood, setFeedbackGood] = useState("");
    const [inputContent, setInputContent] = useState("");

    const userId = user.idUser;

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setInputContent(value);
    };

    async function handleDeleteUser(password) {
        try {
            const response = await fetch(`http://localhost:8000/api/users/deleteUser/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password }),
            });
            if (response.ok) {
                setFeedbackGood("Votre compte est en cours de suppression.");
                await logout();
                setTimeout(() => {
                    setUser(null);
                    navigate("/");
                }, 3000);

            }
        } catch (error) {
            console.error(error);
        }

    }
    return (
        <div className={styles.deleteAccountContainer}>
            {!feedbackGood && <><p>Souhaitez-vous vraiment supprimer votre compte ?</p>
                <p>Cette action est irréversible.</p>
                <p>Si vous changez d'avis, vous aurez toujours la possibilité de vous inscrire à nouveau.</p>

                <label htmlFor="password">Veuillez entrer votre mot de passe afin de supprimer votre compte</label>
                <input type="password" onChange={handleChange} />

                <button type='button' className='btn' onClick={() => handleDeleteUser(inputContent)}>Supprimer mon compte</button></>}
            {feedbackGood && <p>{feedbackGood}</p>}
        </div>
    );
}
