import { useContext, useState } from 'react';
import styles from './ModifyInfo.module.scss';
import { AuthContext } from '../../../../context';

export default function ModifyInfo() {
    const { user, setUser } = useContext(AuthContext);
    const [viewForm, setViewForm] = useState(false);
    return (
        <div className={styles.chosenCategory}>
            <h1 className={styles.chosenCategoryTitle}>Modifier mon profil</h1>
            <div className={styles.subContainerProfile}>
                <div className={styles.userInfoProfile}>
                    {viewForm ? (
                        <h1>Hello</h1>
                    ) : (
                        <>
                            <div className={styles.oneInfo}>
                                <p>Nom</p>
                                <p className={styles.lockedInfo}>{user?.name}</p>
                            </div>

                            <div className={styles.oneInfo}>
                                <p>Prénom</p>
                                <p className={styles.lockedInfo}>{user?.firstname}</p>
                            </div>

                            <div className={styles.oneInfo}>
                                <p>Adresse mail</p>
                                <p className={styles.lockedInfo}>{user?.mail}</p>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
