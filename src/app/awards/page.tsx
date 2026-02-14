"use client";

import { useState } from 'react';
import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Award, Trophy, Star, Zap } from 'lucide-react';
import { awardsData, AwardItem } from '@/lib/data/awards';
import { cn } from '@/lib/utils';
import styles from './awards.module.css';

export default function AwardsPage() {
    const [filter, setFilter] = useState<string>("All");

    const categories = ["All", "Department", "Hackathon", "Research", "Student"];

    const filteredAwards = filter === "All"
        ? awardsData
        : awardsData.filter(a => a.category === filter);

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            {/* Trophy Case Section */}
            <section className={styles.trophyCase}>
                <Container>
                    <h2 className="text-4xl font-black text-white uppercase text-center mb-12">
                        Hall of Fame
                    </h2>
                    <div className={styles.trophyGrid}>
                        <div className={styles.trophy}>
                            <Trophy size={64} />
                            <div className="absolute bottom-4 text-center w-full font-mono text-sm opacity-80">
                                Best Dept 2024
                            </div>
                        </div>
                        <div className={styles.trophy}>
                            <Star size={64} />
                            <div className="absolute bottom-4 text-center w-full font-mono text-sm opacity-80">
                                Innovation Hub
                            </div>
                        </div>
                        <div className={styles.trophy}>
                            <Zap size={64} />
                            <div className="absolute bottom-4 text-center w-full font-mono text-sm opacity-80">
                                Tech Excellence
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Gallery Section */}
            <Section>
                <Container>
                    <div className="flex flex-col items-center mb-12">
                        <h1 className="text-5xl font-black uppercase mb-8 border-4 border-black inline-block pb-3 px-6 bg-white shadow-[6px_6px_0px_black]">Awards Gallery</h1>
                        <div className={styles.filters}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={cn(styles.filterBtn, filter === cat && styles.activeFilter)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.masonryGrid}>
                        {filteredAwards.map(award => (
                            <div key={award.id} className={styles.awardCard}>
                                <div className={styles.ribbon}>
                                    <Award size={20} />
                                </div>
                                <div className="border-b-2 border-black pb-2 mb-4">
                                    <h3 className="font-bold text-lg font-space uppercase leading-tight">
                                        {award.title}
                                    </h3>
                                </div>
                                <div className="mb-4">
                                    <span className="font-mono text-xs bg-black text-white px-2 py-1">
                                        {award.category}
                                    </span>
                                    <span className="font-mono text-xs ml-2 text-gray-500">
                                        {award.year}
                                    </span>
                                </div>
                                <p className="font-bold text-sm mb-2">
                                    Recipient: {award.recipient}
                                </p>
                                <p className="font-mono text-sm text-gray-600">
                                    {award.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
