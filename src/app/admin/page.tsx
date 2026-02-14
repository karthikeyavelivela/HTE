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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    const manualLogin = () => {
        console.log("Manual login triggered with:", password);
        if (password === "123456") {
            setIsLoggedIn(true);
            setError(false);
        } else {
            setError(true);
            alert("Incorrect Password!");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            manualLogin();
        }
    };

    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-[#EAEAEA] flex items-center justify-center relative z-50">
                <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_black] max-w-md w-full mx-4">
                    <h1 className="text-4xl font-black uppercase mb-8 text-center border-b-4 border-black pb-4">
                        Admin Access
                    </h1>
                    {/* Replaced form with div to prevent any default submission issues */}
                    <div className="space-y-6">
                        <div>
                            <label className="block font-mono text-sm font-bold mb-2 uppercase">Security Code</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full p-4 border-4 border-black font-mono text-xl focus:bg-yellow-100 outline-none placeholder:text-gray-400"
                                placeholder="Enter 123456..."
                                autoFocus
                            />
                        </div>
                        {error && (
                            <div className="bg-red-100 border-2 border-red-500 p-2 text-center text-red-600 font-mono text-sm font-bold animate-pulse">
                                ACCESS DENIED
                            </div>
                        )}
                        {/* Standard HTML Button to ensure clickability */}
                        <button
                            onClick={manualLogin}
                            className="w-full font-black text-xl py-6 bg-black text-white hover:bg-gray-800 flex items-center justify-center transition-all active:scale-95"
                        >
                            <Lock size={20} className="mr-2" /> UNLOCK DASHBOARD
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            <div className={styles.container}>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black uppercase border-4 border-black inline-block pb-2 px-4 bg-white">
                        Admin Dashboard
                    </h1>
                </div>

                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    <Button onClick={() => setActiveTab("overview")} className={activeTab === "overview" ? styles.tabActive : styles.tabInactive}>Overview</Button>
                    <Button onClick={() => setActiveTab("faculty")} className={activeTab === "faculty" ? styles.tabActive : styles.tabInactive}>Faculty</Button>
                    <Button onClick={() => setActiveTab("projects")} className={activeTab === "projects" ? styles.tabActive : styles.tabInactive}>Projects</Button>
                    <Button onClick={() => setActiveTab("events")} className={activeTab === "events" ? styles.tabActive : styles.tabInactive}>Events</Button>
                    <Button onClick={() => setActiveTab("clubs")} className={activeTab === "clubs" ? styles.tabActive : styles.tabInactive}>Clubs</Button>
                </div >

                {/* Content Area with Background */}
                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black]">
                    {activeTab === "overview" && (
                        <div className="space-y-8">
                            <div className={styles.execCard}>
                                <div className={styles.hodPhotoFrame}>
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">[PHOTO]</div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black uppercase mb-2">Dr. Ashwin Kumar</h3>
                                    <p className="font-mono text-sm mb-4">Head of Department, Deputy HOD & Professor</p>
                                    <p className="text-sm">Leading the department with a vision for innovation and excellence in tech entrepreneurship.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="border-4 border-black p-6 bg-yellow-100">
                                    <div className="text-4xl font-black mb-2">{facultyData.length}</div>
                                    <div className="font-mono text-sm uppercase">Faculty Members</div>
                                </div>
                                <div className="border-4 border-black p-6 bg-cyan-100">
                                    <div className="text-4xl font-black mb-2">{projectsData.length}</div>
                                    <div className="font-mono text-sm uppercase">Active Projects</div>
                                </div>
                                <div className="border-4 border-black p-6 bg-pink-100">
                                    <div className="text-4xl font-black mb-2">{eventsData.length}</div>
                                    <div className="font-mono text-sm uppercase">Events</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "faculty" && (
                        <DataTable
                            title="Faculty Management"
                            data={facultyData}
                            columns={["name", "role", "email", "publications"]}
                            isFacultyTable={true}
                        />
                    )}

                    {activeTab === "projects" && (
                        <DataTable
                            title="Projects Management"
                            data={projectsData}
                            columns={["id", "title", "status", "category"]}
                        />
                    )}

                    {activeTab === "events" && (
                        <DataTable
                            title="Events Management"
                            data={eventsData}
                            columns={["id", "title", "date", "type"]}
                        />
                    )}

                    {activeTab === "clubs" && (
                        <DataTable
                            title="Clubs Management"
                            data={clubsData}
                            columns={["id", "name", "members"]}
                        />
                    )}
                </div>
            </div >
            <Footer />
        </main >
    );
}

// DataTable Component
function DataTable({ title, data, columns, isFacultyTable = false }: {
    title: string;
    data: any[];
    columns: string[];
    isFacultyTable?: boolean;
}) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b-4 border-black pb-4">
                <h2 className="text-2xl font-black uppercase">{title}</h2>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black border-4 border-black font-bold">
                    <Plus size={16} className="mr-2" /> ADD NEW
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-4 border-black">
                    <thead className="bg-black text-white">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="p-3 text-left uppercase font-mono text-sm border-2 border-white">
                                    {col}
                                </th>
                            ))}
                            {isFacultyTable && (
                                <th className="p-3 text-left uppercase font-mono text-sm border-2 border-white">
                                    Show on Homepage
                                </th>
                            )}
                            <th className="p-3 text-left uppercase font-mono text-sm border-2 border-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} className="border-b-2 border-black hover:bg-gray-50">
                                {columns.map(col => (
                                    <td key={col} className="p-3 font-mono text-sm border-r-2 border-black">
                                        {item[col]}
                                    </td>
                                ))}
                                {isFacultyTable && (
                                    <td className="p-3 border-r-2 border-black">
                                        <input
                                            type="checkbox"
                                            checked={item.showOnHomepage || false}
                                            onChange={() => {
                                                // TODO: Implement toggle functionality
                                                console.log('Toggle homepage visibility for:', item.name);
                                            }}
                                            className="w-5 h-5 cursor-pointer"
                                        />
                                    </td>
                                )}
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <button className="p-2 border-2 border-black hover:bg-cyan-200">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 border-2 border-black hover:bg-red-200">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
