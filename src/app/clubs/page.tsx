"use client";

import Link from 'next/link';
import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { clubsData } from '@/lib/data/clubs';
import styles from './clubs.module.css';

export default function ClubsPage() {
    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />
            <Section>
                <Container>
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-black uppercase mb-4 border-4 border-black inline-block pb-3 px-6 bg-white shadow-[6px_6px_0px_black]">Student Clubs</h1>
                        <p className="font-mono max-w-2xl mx-auto bg-black text-white px-4 py-3 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] inline-block">
                            Where innovation meets community. Join a club, build a team, launch a dream.
                        </p>
                    </div>

                    <div className={styles.clubGrid}>
                        {clubsData.map(club => (
                            <div key={club.id} className={styles.clubCard} style={{ '--logo-color': club.logoColor } as React.CSSProperties}>
                                <div className={styles.logoContainer}>
                                    {club.name.substring(0, 1)}
                                </div>
                                <h3 className="font-bold text-xl uppercase mb-2 leading-tight min-h-[3rem] flex items-center justify-center">
                                    {club.name}
                                </h3>
                                <p className="text-sm font-mono text-gray-600 line-clamp-2 min-h-[2.5rem]">
                                    {club.description}
                                </p>
                                <div className={styles.memberCount}>
                                    MEMBERS: {club.members}
                                </div>
                                <Link href={`/clubs/${club.id}`} className="block mt-4">
                                    <Button variant="outline" className="w-full uppercase font-bold border-2">
                                        View & Join
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
