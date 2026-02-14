"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { clubsData } from '@/lib/data/clubs';
import styles from './clubs.module.css';
import { Calendar, Users, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function ClubProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const club = clubsData.find(c => c.id === id);

    if (!club) notFound();

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <Navbar />

            <div className={styles.profileHeader} style={{ '--logo-color': club.logoColor } as React.CSSProperties}>
                <Container>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 relative z-10">
                        {club.name}
                    </h1>
                    <div className="font-mono text-xl max-w-2xl relative z-10">
                        {club.description}
                    </div>
                    <div className={styles.flag}>
                        {club.name.substring(0, 1)}
                    </div>
                </Container>
            </div>

            <Section>
                <Container className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_black]">
                            <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">Upcoming Activities</h2>
                            {club.activities.length > 0 ? (
                                <ul className="space-y-4">
                                    {club.activities.map((act, idx) => (
                                        <li key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                                            <span className="font-bold">{act.title}</span>
                                            <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">{act.date}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="font-mono italic text-gray-500">No upcoming activities listed.</p>
                            )}
                        </div>

                        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0_black]">
                            <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">About Us</h2>
                            <p className="font-mono">
                                We are a community of {club.members} passionate students dedicated to {club.category.toLowerCase()} excellence.
                                Whether you are a beginner or an expert, there is a place for you here.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#f0f0f0] p-6 border-2 border-black">
                            <h3 className="font-bold uppercase mb-4">Quick Info</h3>
                            <ul className="space-y-4 font-mono text-sm">
                                <li className="flex items-start gap-2">
                                    <Users size={16} className="mt-1" />
                                    <div>
                                        <span className="font-bold block">Lead</span>
                                        {club.lead}
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Calendar size={16} className="mt-1" />
                                    <div>
                                        <span className="font-bold block">Meetings</span>
                                        {club.meetingTime}
                                    </div>
                                </li>
                                <li className="flex items-start gap-2">
                                    <MapPin size={16} className="mt-1" />
                                    <div>
                                        <span className="font-bold block">Category</span>
                                        {club.category}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <Button className="w-full h-12 text-lg">
                            Join Club
                        </Button>
                        <Link href="/clubs" className="block text-center font-mono underline">
                            Back to Directory
                        </Link>
                    </div>
                </Container>
            </Section>

            <Footer />
        </main>
    );
}
