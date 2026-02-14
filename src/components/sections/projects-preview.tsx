"use client";

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import styles from './projects-preview.module.css';

const projects = [
    { id: 1, title: "Neural Network Visualizer", desc: "Interactive 3D tool for learning AI.", status: "LIVE" },
    { id: 2, title: "Decentralized Voting", desc: "Blockchain based secure voting.", status: "BETA" },
    { id: 3, title: "Smart Campus IoT", desc: "Automated energy management.", status: "CONFIDENTIAL" },
];

export function ProjectsPreview() {
    return (
        <Section className="bg-white">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-black uppercase border-4 border-black inline-block pb-2 px-4 bg-white">Active Projects</h2>
                    <Link href="/projects">
                        <Button variant="outline">View All Archives</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    {projects.map((project) => (
                        <div key={project.id} className={styles.folder}>
                            <span className={styles.tab}>PROJ-{project.id.toString().padStart(3, '0')}</span>
                            <div className={styles.content}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.description}>{project.desc}</p>
                                <div className={styles.stamp}>{project.status}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
