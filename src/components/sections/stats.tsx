"use client";

import { useRef, useEffect, useState } from 'react';
import { useInView, motion, useSpring, useTransform } from 'framer-motion';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import styles from './stats.module.css';

const stats = [
    { label: 'Faculty Members', value: 25 },
    { label: 'Active Projects', value: 42 },
    { label: 'Awards Won', value: 15 },
    { label: 'Student Founders', value: 120 },
];

function Counter({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const springValue = useSpring(0, { bounce: 0, duration: 2000 });
    const rounded = useTransform(springValue, (latest) => Math.round(latest));

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, springValue, value]);

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            setDisplayValue(latest);
        });
        return () => unsubscribe();
    }, [rounded]);

    return <span ref={ref}>{displayValue}</span>;
}

export function Stats() {
    return (
        <Section>
            <Container>
                <div className={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className={styles.statCard}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <span className={styles.number}>
                                <Counter value={stat.value} />+
                            </span>
                            <span className={styles.label}>{stat.label}</span>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
