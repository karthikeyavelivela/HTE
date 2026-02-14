"use client";

import { use, useState } from 'react'; // React.use for unwrapping params
import { notFound } from 'next/navigation';
import { facultyData } from '@/lib/data/faculty';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import styles from './profile.module.css';
import { Mail, Briefcase, Calendar, Award, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const faculty = facultyData.find((f) => f.id === id);
    const [activeTab, setActiveTab] = useState("info");

    if (!faculty) {
        notFound();
    }

    const tabs = [
        { id: "info", label: "Basic Info", icon: <Briefcase size={16} /> },
        { id: "classes", label: "Teaching", icon: <BookOpen size={16} /> },
        { id: "timings", label: "Schedule", icon: <Calendar size={16} /> },
        { id: "awards", label: "Awards", icon: <Award size={16} /> },
    ];

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <Navbar />
            <Section>
                <Container>
                    <div className={styles.profileContainer}>
                        {/* Left Column: Photo & Quick Stats */}
                        <div className={styles.photoSection}>
                            <div className={styles.photoFrame}>
                                <div className={styles.photo}>
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 font-mono text-sm">
                                        [PHOTO]
                                    </div>
                                </div>
                                <div className="font-handwriting text-2xl rotate-[-5deg] opacity-80">
                                    Faculty ID: {faculty.id}
                                </div>
                            </div>

                            <div className={styles.namePlate}>
                                <h1 className="text-xl font-bold font-space uppercase text-black">
                                    {faculty.name}
                                </h1>
                                <p className="font-mono text-sm text-black/80 uppercase">{faculty.role}</p>
                            </div>

                            <div className="mt-8 text-left">
                                <h3 className="font-bold border-b-2 border-black mb-2">Specialization</h3>
                                <div className="flex flex-wrap gap-2">
                                    {faculty.specialization.map(s => (
                                        <Badge key={s} variant="outline" className="bg-white">{s}</Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Tabbed Content */}
                        <div className={styles.tabsContainer}>
                            <div className={styles.tabsHeader}>
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={cn(styles.tab, activeTab === tab.id && styles.activeTab)}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        <span className="flex items-center gap-2">
                                            {tab.icon}
                                            {tab.label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            <div className={styles.tabContent}>
                                {activeTab === 'info' && (
                                    <div className="space-y-6">
                                        <h2 className="text-3xl font-black mb-6">About</h2>
                                        <div className={styles.infoGrid}>
                                            <div className={styles.infoCard}>
                                                <label className="font-mono text-xs text-gray-500 block">EMAIL</label>
                                                <a href={`mailto:${faculty.email}`} className="font-bold underline text-blue-600 block truncate">
                                                    {faculty.email}
                                                </a>
                                            </div>
                                            <div className={styles.infoCard}>
                                                <label className="font-mono text-xs text-gray-500 block">CABIN</label>
                                                <span className="font-bold text-xl">{faculty.cabin}</span>
                                            </div>
                                            <div className={styles.infoCard}>
                                                <label className="font-mono text-xs text-gray-500 block">PUBLICATIONS</label>
                                                <span className="font-bold text-xl">{faculty.publications}</span>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <h3 className="font-bold border-b-2 border-black mb-4">Research Areas</h3>
                                            <ul className="list-disc pl-5 font-mono space-y-2">
                                                {faculty.researchAreas.map(area => (
                                                    <li key={area}>{area}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'classes' && (
                                    <div>
                                        <h2 className="text-3xl font-black mb-6">Current Classes</h2>
                                        <div className="grid gap-4">
                                            {faculty.currentClasses.map((cls, idx) => (
                                                <div key={idx} className="border-2 border-black p-4 bg-white shadow-[4px_4px_0_black]">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <div className="font-mono text-xs bg-black text-white inline-block px-1 mb-2">
                                                                {cls.code}
                                                            </div>
                                                            <h3 className="font-bold text-lg">{cls.name}</h3>
                                                        </div>
                                                        {cls.isCourseCoordinator && (
                                                            <Badge className="bg-yellow-400 text-black">COORDINATOR</Badge>
                                                        )}
                                                    </div>
                                                    <div className="mt-4 font-mono text-sm border-t border-dashed border-gray-400 pt-2">
                                                        TIMING: {cls.timings}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'timings' && (
                                    <div>
                                        <h2 className="text-3xl font-black mb-6">Available Slots</h2>
                                        <div className="grid grid-cols-1 gap-4">
                                            {Object.entries(faculty.availableTimings).map(([day, times]) => (
                                                <div key={day} className="flex border-b-2 border-gray-200 py-4">
                                                    <div className="w-32 font-bold uppercase">{day}</div>
                                                    <div className="flex gap-2">
                                                        {times.map(t => (
                                                            <Badge key={t} variant="filled" className="bg-green-400 text-black border-black">
                                                                {t}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'awards' && (
                                    <div>
                                        <h2 className="text-3xl font-black mb-6">Recognition</h2>
                                        <div className="space-y-4">
                                            {faculty.awards.length > 0 ? faculty.awards.map((award, idx) => (
                                                <div key={idx} className="flex items-center gap-4 bg-yellow-50 p-4 border border-yellow-200">
                                                    <Award className="text-yellow-600" />
                                                    <div>
                                                        <h4 className="font-bold">{award.title}</h4>
                                                        <p className="text-sm font-mono text-gray-600">{award.organization} | {award.year}</p>
                                                    </div>
                                                </div>
                                            )) : (
                                                <p className="font-mono text-gray-500 italic">No public awards listed.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
