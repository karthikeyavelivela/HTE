"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectsData } from '@/lib/data/projects';
import { cn } from '@/lib/utils';
import styles from './projects.module.css';

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");
    const categories = ["All", "Ongoing", "Completed", "Student", "Faculty"];

    const filteredProjects = projectsData.filter(p => {
        if (filter === "All") return true;
        if (filter === "Ongoing" || filter === "Completed") return p.status === filter;
        return p.category === filter;
    });

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />
            <Section>
                <Container>
                    <div className="flex flex-col items-center mb-12">
                        <h1 className="text-5xl font-black uppercase mb-8 border-4 border-black inline-block pb-3 px-6 bg-white shadow-[6px_6px_0px_black]">Project Archive</h1>
                        <p className="font-mono max-w-2xl mx-auto text-center bg-black text-white px-4 py-3 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.3)] inline-block">
                            Exploring the frontiers of technology through hands-on innovation.
                        </p>

                        <div className={styles.filterBar}>
                            {categories.map(cat => (
                                <Button
                                    key={cat}
                                    variant={filter === cat ? 'primary' : 'outline'}
                                    onClick={() => setFilter(cat)}
                                    size="sm"
                                >
                                    {cat}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.projectGrid}>
                        {filteredProjects.map(project => (
                            <Link key={project.id} href={`/projects/${project.id}`}>
                                <div className={styles.folderCard}>
                                    <span className={cn(styles.statusStamp, project.status === 'Ongoing' ? styles.statusOngoing : styles.statusCompleted)}>
                                        {project.status === 'Ongoing' ? 'WIP' : 'DONE'}
                                    </span>
                                    <div className="mt-4 mb-2">
                                        <span className="font-mono text-xs uppercase opacity-60">
                                            {project.id} // {project.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold font-space uppercase leading-tight mb-4">
                                        {project.title}
                                    </h3>
                                    <p className="font-mono text-sm opacity-80 line-clamp-3 mb-4">
                                        {project.description} // Click to read more...
                                    </p>
                                    <div className="mt-auto flex gap-2 flex-wrap">
                                        {project.techStack.slice(0, 3).map(tech => (
                                            <Badge key={tech} variant="outline" className="text-[10px] bg-white/50 border-black/50">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
