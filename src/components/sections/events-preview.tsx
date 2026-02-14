"use client";

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import styles from './events-preview.module.css';

const events = [
    { id: 1, date: "15 MAR", title: "Tech Founder Talks", time: "10:00 AM @ Auditorium" },
    { id: 2, date: "22 MAR", title: "Hackathon Kickoff", time: "09:00 AM @ Lab 1" },
    { id: 3, date: "05 APR", title: "Project Expo", time: "02:00 PM @ Main Hall" },
];

export function EventsPreview() {
    return (
        <Section>
            <Container>
                <h2 className="text-4xl font-black mb-12 uppercase border-4 border-black inline-block pb-2 px-4 bg-white">
                    Upcoming Events
                </h2>
                <div className={styles.timeline}>
                    {events.map((event) => (
                        <div key={event.id} className={styles.eventCard}>
                            <div className={styles.connector} />
                            <div className={styles.date}>{event.date}</div>
                            <h3 className={styles.title}>{event.title}</h3>
                            <p className="font-mono text-sm text-gray-600">{event.time}</p>
                            <Button size="sm" variant="outline" className="mt-4">
                                RSVP
                            </Button>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
