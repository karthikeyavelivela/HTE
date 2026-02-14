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

            {/* Infinite Scroll Awards Section */}
            <section className="bg-black py-8 overflow-hidden border-b-4 border-black">
                <div className={styles.scroller}>
                    <div className={styles.scrollContent}>
                        {/* Card 1: Best Faculty */}
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Award className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">Best Faculty</h3>
                            <p className="text-gray-600 font-mono text-center">Excellence in Teaching & Research</p>
                        </div>

                        {/* Card 2: Best Project */}
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Trophy className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">Best Project</h3>
                            <p className="text-gray-600 font-mono text-center">Innovation & Impact</p>
                        </div>

                        {/* Card 3: New Skill Palavar */}
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Zap className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">New Skill Palavar</h3>
                            <p className="text-gray-600 font-mono text-center">Emerging Tech Mastery</p>
                        </div>

                        {/* Duplicate Cards for Smooth Loop */}
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Award className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">Best Faculty</h3>
                            <p className="text-gray-600 font-mono text-center">Excellence in Teaching & Research</p>
                        </div>
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Trophy className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">Best Project</h3>
                            <p className="text-gray-600 font-mono text-center">Innovation & Impact</p>
                        </div>
                        <div className="min-w-[300px] h-[400px] bg-white border-4 border-black p-8 flex flex-col items-center justify-center gap-6 shadow-[8px_8px_0px_white]">
                            <Zap className="text-black w-24 h-24" />
                            <h3 className="text-3xl font-black text-black uppercase text-center">New Skill Palavar</h3>
                            <p className="text-gray-600 font-mono text-center">Emerging Tech Mastery</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <div className="py-12 bg-[#EAEAEA]">
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
            </div>
            <Footer />
        </main>
    );
}
