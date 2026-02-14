"use client";

import { useEffect, useState } from 'react';
import styles from './splash-screen.module.css';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("");

    const bootSequence = [
        "INITIALIZING KERNEL...",
        "LOADING BIOS...",
        "CHECKING MEMORY...",
        "MOUNTING VOLUMES...",
        "LOADING ASSETS...",
        "ESTABLISHING CONNECTION...",
        "SYSTEM READY."
    ];

    useEffect(() => {
        let currentLine = 0;

        // Progress bar animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2; // 50 steps * 60ms = 3000ms approx
            });
        }, 40);

        // Text output animation
        const textInterval = setInterval(() => {
            if (currentLine < bootSequence.length) {
                setText(prev => prev + "> " + bootSequence[currentLine] + "\n");
                currentLine++;
            } else {
                clearInterval(textInterval);
            }
        }, 400);

        // Completion timeout
        const timeout = setTimeout(() => {
            onComplete();
        }, 3500);

        return () => {
            clearInterval(progressInterval);
            clearInterval(textInterval);
            clearTimeout(timeout);
        };
    }, [onComplete]);

    return (
        <motion.div
            className={styles.splashContainer}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className={styles.scanline}></div>

            <div className={styles.terminalText}>
                {text}
            </div>

            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
            </div>

            <div className="mt-4 font-bold text-xl glitch-effect">
                CSE-HTE DEPARTMENT
            </div>
        </motion.div>
    );
}
