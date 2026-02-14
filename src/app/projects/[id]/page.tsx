"use client";

import { use } from 'react';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { projectsData } from '@/lib/data/projects';
import styles from './projects.module.css';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projectsData.find(p => p.id === id);

    if (!project) notFound();

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <Navbar />

            {/* Blueprint Header */}
            <div className={styles.detailHeader}>
                <Container>
                    <Link href="/projects" className="inline-flex items-center text-white/70 hover:text-white mb-8 border-b border-white/30 pb-1">
                        <ArrowLeft size={16} className="mr-2" /> Back to Archive
                    </Link>
                    <div className="flex justify-between items-end flex-wrap gap-4">
                        <div>
                            <div className="font-mono text-blue-300 mb-2">PROJ_ID: {project.id}</div>
                            <h1 className="text-4xl md:text-6xl font-black uppercase text-white tracking-tight">
                                {project.title}
                            </h1>
                        </div>
                        <div className="flex gap-2">
                            {project.links.map(link => (
                                <Button key={link.label} variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                                    {link.label === 'GitHub' ? <Github size={16} className="mr-2" /> : <ExternalLink size={16} className="mr-2" />}
                                    {link.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>

            <Section>
                <Container className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Notebook Content */}
                    <div className="lg:col-span-2">
                        <div className={styles.notebookPage}>
                            <div className={styles.spiral}></div>
                            <h2 className="font-bold text-2xl mb-4 underline decoration-wavy decoration-pink-500">Project Overview</h2>
                            <p className="mb-8 text-lg">
                                {project.description}
                            </p>

                            <h3 className="font-bold text-xl mb-4 uppercase bg-yellow-200 inline-block px-2">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.techStack.map(tech => (
                                    <Badge key={tech} className="border-black text-lg">{tech}</Badge>
                                ))}
                            </div>

                            <h3 className="font-bold text-xl mb-4 uppercase bg-cyan-200 inline-block px-2">Development Timeline</h3>
                            <div className="border-l-2 border-black pl-4 space-y-6">
                                {project.timeline.map((item, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="absolute -left-[21px] top-2 w-3 h-3 bg-black rounded-full"></div>
                                        <div className="font-bold">{item.milestone}</div>
                                        <div className="font-mono text-sm text-gray-500">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_black]">
                            <h3 className="font-black text-xl mb-4 uppercase border-b-2 border-black pb-2">Team Members</h3>
                            <ul className="space-y-2">
                                {project.team.map(member => (
                                    <li key={member} className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gray-200 rounded-full border border-black"></div>
                                        <span className="font-mono font-bold">{member}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-black text-white p-6 border-4 border-gray-800">
                            <h3 className="font-bold text-green-400 mb-2 uppercase text-sm">Status Report</h3>
                            <div className="font-mono text-3xl font-bold uppercase mb-2">
                                {project.status}
                            </div>
                            <div className="w-full bg-gray-800 h-2 mt-2">
                                <div className={`h-full ${project.status === 'Completed' ? 'w-full bg-green-500' : 'w-2/3 bg-yellow-400'}`}></div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
            <Footer />
        </main>
    );
}
