"use client";

import { useState } from 'react';
import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { facultyData } from '@/lib/data/faculty';
import { projectsData } from '@/lib/data/projects';
import { eventsData } from '@/lib/data/events';
import { clubsData } from '@/lib/data/clubs';
import { Edit, Trash2, Plus, Lock } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            <div className={styles.container}>
                <div className="text-center mb-8">
                    <h1 className={styles.heading}>Admin Dashboard</h1>
                </div>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <Button onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? styles.tabActive : styles.tabInactive}>Overview</Button>
                    <Button onClick={() => setActiveTab("faculty")} className={activeTab === "faculty" ? styles.tabActive : styles.tabInactive}>Faculty</Button>
                    <Button onClick={() => setActiveTab("projects")} className={activeTab === "projects" ? styles.tabActive : styles.tabInactive}>Projects</Button>
                    <Button onClick={() => setActiveTab("events")} className={activeTab === "events" ? styles.tabActive : styles.tabInactive}>Events</Button>
                </div >

                {activeTab === "overview" && <OverviewSection />
                }
                {activeTab === "faculty" && <DataTable title="Faculty Directory" data={facultyData} columns={['id', 'name', 'role', 'cabin']} />}
                {activeTab === "projects" && <DataTable title="Projects Archive" data={projectsData} columns={['id', 'title', 'category', 'status']} />}
                {activeTab === "events" && <DataTable title="Event Calendar" data={eventsData} columns={['id', 'title', 'date', 'type']} />}

            </div >
            <Footer />
        </main >
    );
}

function OverviewSection() {
    const hod = facultyData.find(f => f.role === "Head of Department") || facultyData[0];
    return (
        <div className="space-y-12">
            <div className={styles.execCard}>
                <div className={styles.hodPhotoFrame}>
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 font-mono text-5xl">👤</div>
                </div>
                <div className="flex-1 text-left">
                    <h2 className="text-3xl font-black uppercase mb-1">{hod.name}</h2>
                    <p className="font-mono text-lg text-gray-600 mb-6 uppercase tracking-widest">{hod.role}</p>
                    <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 font-mono text-sm">
                        SYSTEM STATUS: ALL SYSTEMS OPERATIONAL.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_black]">
                    <h3 className="font-bold uppercase text-gray-500">Total Students</h3>
                    <div className="text-4xl font-black">450</div>
                </div>
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_black]">
                    <h3 className="font-bold uppercase text-gray-500">Research Grants</h3>
                    <div className="text-4xl font-black">$2.5M</div>
                </div>
                <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0_black]">
                    <h3 className="font-bold uppercase text-gray-500">Active Clubs</h3>
                    <div className="text-4xl font-black">{clubsData.length}</div>
                </div>
            </div>
        </div>
    );
}

function DataTable({ title, data, columns }: { title: string, data: any[], columns: string[] }) {
    const isFacultyTable = title === "Faculty Directory";

    return (
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_black] p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase">{title}</h2>
                <Button size="sm" className="flex items-center gap-2 bg-black text-white hover:bg-gray-800"><Plus size={16} /> Add New</Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full font-mono text-sm text-left">
                    <thead>
                        <tr className="bg-black text-white">
                            {columns.map(col => (
                                <th key={col} className="p-3 uppercase">{col}</th>
                            ))}
                            {isFacultyTable && <th className="p-3 uppercase">Show on Homepage</th>}
                            <th className="p-3 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                                {columns.map(col => (
                                    <td key={col} className="p-3 truncate max-w-[200px]">{item[col]}</td>
                                ))}
                                {isFacultyTable && (
                                    <td className="p-3">
                                        <input
                                            type="checkbox"
                                            checked={item.showOnHomepage || false}
                                            onChange={() => {/* TODO: Implement toggle */ }}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                    </td>
                                )}
                                <td className="p-3 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 mr-2"><Edit size={16} /></button>
                                    <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
