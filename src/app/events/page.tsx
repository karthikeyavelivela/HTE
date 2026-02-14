"use client";

import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { eventsData } from '@/lib/data/events';
import styles from './events.module.css';

export default function EventsPage() {
    const upcomingEvents = eventsData.filter(e => e.type === "Upcoming");
    const pastEvents = eventsData.filter(e => e.type === "Past");

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            <Section>
                <Container>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black uppercase mb-4 border-4 border-black inline-block pb-3 px-6 bg-white shadow-[6px_6px_0px_black]">Event Calendar</h1>
                    </div>

                    <h2 className="text-2xl font-black uppercase mb-8 border-b-4 border-black inline-block">Upcoming</h2>
                    <div className={styles.ticketContainer}>
                        {upcomingEvents.map(event => (
                            <div key={event.id} className={styles.ticket}>
                                <div className={styles.ticketStub}>
                                    <span className={styles.dateDay}>{event.date.split(" ")[0]}</span>
                                    <span className={styles.dateMonth}>{event.date.split(" ")[1]}</span>
                                </div>
                                <div className={styles.ticketContent}>
                                    <h3 className={styles.ticketTitle}>{event.title}</h3>
                                    <div className={styles.ticketInfo}>
                                        <div>TIME: {event.time}</div>
                                        <div>LOC: {event.location}</div>
                                    </div>
                                    <p className="font-mono text-sm mb-4 line-clamp-2">{event.description}</p>
                                    <Button size="sm" className="mt-auto self-start">RSVP Now</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24">
                        <h2 className="text-2xl font-black uppercase mb-8 border-b-4 border-black inline-block">Past Highlights</h2>
                        <div className={styles.pastGallery}>
                            {pastEvents.map(event => (
                                <div key={event.id} className={styles.photoCard}>
                                    <div className={styles.photoPlaceholder}></div>
                                    <h3 className="font-bold text-center font-caveat text-xl transform -rotate-2">{event.title}</h3>
                                    <div className="text-center font-mono text-xs text-gray-500 mt-2">{event.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </Container>
            </Section>
            <Footer />
        </main>
    );
}
