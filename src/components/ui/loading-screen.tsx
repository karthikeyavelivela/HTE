"use client";

import { useEffect, useState } from 'react';
import styles from './loading-screen.module.css';
import { motion } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            className={styles.loaderContainer}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            <div className={styles.loaderText} data-text="CSE-HTE">
                CSE-HTE
            </div>
            <div className={styles.subText}>
                LOADING RESOURCES... {count}%
            </div>
        </motion.div>
    );
}
