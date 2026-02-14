"use client";

import { useRef } from 'react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { facultyData } from '@/lib/data/faculty';
import styles from './faculty-carousel.module.css';

export function FacultyCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Filter faculty to show only those marked for homepage
    const featuredFaculty = facultyData.filter(f => f.showOnHomepage);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 340; // Card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Section>
            <Container>
                <h2 className="text-4xl font-black mb-12 uppercase border-4 border-black inline-block pb-2 px-4 bg-white">
                    Featured Faculty
                </h2>

                <div className={styles.carouselContainer}>
                    <div className={styles.track} ref={scrollRef}>
                        {featuredFaculty.map((member) => (
                            <div key={member.id} className={styles.card}>
                                <div className={styles.photoFrame}>
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center font-mono text-xs">
                                        [PHOTO]
                                    </div>
                                </div>
                                <h3 className={styles.name}>{member.name}</h3>
                                <p className={styles.role}>{member.role}</p>
                                <Button variant="outline" size="sm" className="w-full">
                                    Profile
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.controls}>
                        <Button onClick={() => scroll('left')} variant="outline">
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button onClick={() => scroll('right')} variant="outline">
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
