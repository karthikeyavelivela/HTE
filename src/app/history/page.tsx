"use client";

import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import styles from './history.module.css';

export default function HistoryPage() {
    const milestones = [
        { year: "2018", title: "Inception", desc: "The CSE-HTE program was conceived to bridge the gap between technical engineering skills and entrepreneurial mindset." },
        { year: "2019", title: "First Intake", desc: "Welcomed the inaugural batch of 60 students selected through a rigorous aptitude and innovation test." },
        { year: "2021", title: "Incubation Center", desc: "Launch of the dedicated startup incubation center providing seed funding and mentorship." },
        { year: "2023", title: "National Recognition", desc: "Awarded 'Most Innovative Curriculum' by the National Education Council." },
        { year: "2025", title: "Global Expansion", desc: "Partnerships established with 5 international universities for student exchange and joint research." }
    ];

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />
            
            <Section>
                <Container>
                    {/* Newspaper Article Section */}
                    <div className={styles.paperSection}>
                        <div className={styles.newspaperHeader}>
                            <h1 className={styles.headline}>Department Chronicles</h1>
                            <div className={styles.subhead}>Vol. 1 | Founded 2018 | The Origin Story</div>
                        </div>

                        <div className={styles.articleColumns}>
                            <p className="mb-4">
                                <span className="float-left text-6xl font-black mr-2 line-height-1">It</span>
                                began with a simple yet radical idea: what if computer science education wasn't just about code, but about creating value? In 2018, a group of visionary faculty members proposed a new curriculum that would fuse rigorous engineering standards with the chaotic, fast-paced world of technology entrepreneurship.
                            </p>
                            <p className="mb-4">
                                The initial proposal was met with skepticism. "Engineers build, managers sell," was the prevailing dogma. But the industry was changing. The unicorns of the decade were founded by hackers, makers, and coders who understood business. CSE-HTE was born to nurture this new breed of founder-engineers.
                            </p>
                            <p>
                                Today, the department stands as a testament to that vision. With over 15 funded startups, 20 patents, and countless hackathon victories, CSE-HTE has proven that when you give builders the tools to build businesses, they don't just write software—they rewrite the future.
                            </p>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className={styles.timelineSection}>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black uppercase inline-block bg-black text-white px-4 py-2 transform -rotate-2">
                                The Timeline
                            </h2>
                        </div>

                        <div className={styles.timelineLine}></div>

                        {milestones.map((milestone, idx) => (
                            <div key={idx} className={styles.milestone}>
                                <div className={styles.connector}></div>
                                <div className={styles.milestoneContent}>
                                    <div className={styles.yearBadge}>{milestone.year}</div>
                                    <h3 className="font-bold text-xl uppercase mb-2 mt-2">{milestone.title}</h3>
                                    <p className="font-mono text-sm">{milestone.desc}</p>
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
