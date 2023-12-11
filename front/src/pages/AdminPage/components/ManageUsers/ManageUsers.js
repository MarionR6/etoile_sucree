import { useEffect, useState } from 'react';
import styles from './ManageUsers.module.scss';
import { getAllUsers } from '../../../../api/users';

export default function ManageUsers() {

    const [showModal, setShowModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const usersFromBack = await getAllUsers();
            setAllUsers(usersFromBack);
        }
        getUsers();
    }, [allUsers]);

    const handleDelete = (idUser) => {
        // const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cette recette ? Cette action est irréversible.");
        setShowModal(true);
        setIdToDelete(idUser);
    };
    return (
        <div className={styles.manageUsersContainer}>
            <table className='cardBrown'>
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
                            <td className={styles.buttonContainer}><button
                                type='button'
                                onClick={() => handleDelete(u.idUser)}><i className="fa-solid fa-trash"></i></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
