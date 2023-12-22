import styles from './Modal.module.scss';

export default function Modal({ message, onConfirm, onCancel }) {
    return (

        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <p className={styles.message}>
                    {message}
                </p>
                <div className={styles.buttonsContainer}>
                    <button
                        className={styles.confirmButton}
                        onClick={onConfirm}
                        title='Cliquez pour confirmer votre choix'>
                        Confirmer
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={onCancel}
                        title='Cliquez pour annuler'>
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
}
