"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useData } from '@/lib/context/DataContext';
import { Search, Grid, List } from 'lucide-react';
import styles from './faculty.module.css';

export default function FacultyPage() {
    const { faculty: facultyData } = useData();
    const [searchTerm, setSearchTerm] = useState("");
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const filteredFaculty = facultyData.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            <Section>
                <Container>
                    <div className="mb-8">
                        <h1 className="text-5xl font-black uppercase mb-4">Faculty Directory</h1>
                        <p className="font-mono max-w-2xl">
                            Meet the minds shaping the future of technology and entrepreneurship.
                        </p>
                    </div>

                    <div className={styles.filterBar}>
                        <div className="flex items-center flex-1 max-w-lg relative">
                            <Search className="absolute left-3 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by name or specialization..."
                                className={styles.search}
                                style={{ paddingLeft: '2.5rem' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* View toggle could go here */}
                    </div>

                    <div className={styles.grid}>
                        {filteredFaculty.map((member) => (
                            <div key={member.id} className={styles.card}>
                                <div className={styles.photoFrame}>
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 font-mono text-xs">
                                        [PHOTO]
                                    </div>
                                </div>
                                <h2 className={styles.name}>{member.name}</h2>
                                <p className={styles.role}>{member.role}</p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.specialization.slice(0, 2).map((spec) => (
                                        <Badge key={spec} variant="outline" className="text-[10px]">
                                            {spec}
                                        </Badge>
                                    ))}
                                    {member.specialization.length > 2 && (
                                        <Badge variant="outline" className="text-[10px]">+{member.specialization.length - 2}</Badge>
                                    )}
                                </div>

                                <div className="flex justify-between items-center mt-4 pt-4 border-t-2 border-black">
                                    <div className="font-mono text-xs font-bold">
                                        CABIN: {member.cabin}
                                    </div>
                                    <Link href={`/faculty/${member.id}`}>
                                        <Button size="sm">Profile</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
