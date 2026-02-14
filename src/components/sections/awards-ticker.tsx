import { Award } from 'lucide-react';
import styles from './awards-ticker.module.css';

const awards = [
    "National Hackathon 2025 Winners",
    "Best Research Paper - IEEE CloudCom",
    "AI for Good - Global Finalists",
    "Smart India Hackathon - 1st Runner Up",
    "Google Solution Challenge - Top 50",
    "National Hackathon 2025 Winners", // Repeat for seamless loop
    "Best Research Paper - IEEE CloudCom",
    "AI for Good - Global Finalists",
    "Smart India Hackathon - 1st Runner Up",
    "Google Solution Challenge - Top 50",
];

export function AwardsTicker() {
    return (
        <div className={styles.tickerContainer}>
            <div className={styles.scroller}>
                {awards.map((award, index) => (
                    <div key={index} className={styles.awardItem}>
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400 border-2 border-white shadow-[2px_2px_0_black]">
                            <Award size={24} color="#FFE500" />
                        </div>
                        {award}
                    </div>
                ))}
            </div>
        </div>
    );
}
