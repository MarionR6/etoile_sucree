import { useEffect, useState } from 'react';
import styles from './ManageUsers.module.scss';
import { adminDeleteUser, getAllUsers } from '../../../../api/users';
import Modal from "../../../../components/Modal/Modal";

export default function ManageUsers() {

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [userToDelete, setUserToDelete] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const usersFromBack = await getAllUsers();
            setAllUsers(usersFromBack);
        }
        getUsers();
    }, [allUsers]);

    const handleDelete = (idUser, name, firstname) => {
        setShowModal(true);
        setIdToDelete(idUser);
        setUserToDelete({ name: name, firstname: firstname });
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = async () => {
        const response = await adminDeleteUser(idToDelete);
        handleDeleteFront(idToDelete);
        setShowModal(false);
        setFeedback(response);
    };

    const handleDeleteFront = (id) => {
        setAllUsers(allUsers.filter((user) => user.idUser !== id));
    };

    return (
        <div className={styles.manageUsersContainer}>
            <div className={styles.usersTableContainer}>
                <table className={`cardBrown ${styles.tableUsers}`}>
                    <thead>
                        <tr>
                            <th>Nom de l'utilisateur</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((u, index) => (
                            <tr key={index}>
                                <td>{u.name}, {u.firstname}</td>
                                <td className={styles.buttonContainer}>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(u.idUser, u.name, u.firstname)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal && <Modal message={`Souhaitez-vous vraiment supprimer l'utilisateur ${userToDelete.firstname} ${userToDelete.name} ? Cette action est irréversible.`}
                    onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />}
                {feedback && <p>{feedback}</p>}
            </div>

        </div>
    );
}
