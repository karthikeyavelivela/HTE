"use client";

import styles from './infinite-grid.module.css';

export const InteractiveGrid = () => {
    return (
        <div className={styles.gridContainer}>
            <div className={styles.gridPattern} />
            <div className={styles.overlay} />
        </div>
    );
};
