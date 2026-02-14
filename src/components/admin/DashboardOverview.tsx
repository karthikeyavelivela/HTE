"use client";

import { facultyData } from "@/lib/data/faculty";
import { projectsData } from "@/lib/data/projects";
import { eventsData } from "@/lib/data/events";
import { awardsData } from "@/lib/data/awards";
import { clubsData } from "@/lib/data/clubs";
import { Users, FolderOpen, Calendar, Trophy, BookOpen } from "lucide-react";

const stats = [
    { label: "Faculty", icon: Users, color: "#FFE500", get: () => facultyData.length },
    { label: "Projects", icon: FolderOpen, color: "#00F0FF", get: () => projectsData.length },
    { label: "Events", icon: Calendar, color: "#FF006E", get: () => eventsData.length },
    { label: "Awards", icon: Trophy, color: "#BFFF00", get: () => awardsData.length },
    { label: "Clubs", icon: BookOpen, color: "#C084FC", get: () => clubsData.length },
];

export default function DashboardOverview() {
    return (
        <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "1.5rem", color: "#000" }}>
                Department Overview
            </h2>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
                {stats.map((s) => (
                    <div
                        key={s.label}
                        style={{
                            border: "3px solid #000",
                            padding: "1.5rem",
                            background: s.color,
                            boxShadow: "4px 4px 0px #000",
                            transition: "transform 0.1s, box-shadow 0.1s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate(-2px,-2px)";
                            e.currentTarget.style.boxShadow = "6px 6px 0px #000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "none";
                            e.currentTarget.style.boxShadow = "4px 4px 0px #000";
                        }}
                    >
                        <s.icon size={24} style={{ marginBottom: "0.5rem" }} />
                        <div style={{ fontSize: "2.5rem", fontWeight: 900, lineHeight: 1 }}>{s.get()}</div>
                        <div style={{ fontFamily: "monospace", fontSize: "0.75rem", textTransform: "uppercase", marginTop: "0.25rem" }}>
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* HOD Card */}
            <div
                style={{
                    border: "3px solid #000",
                    padding: "1.5rem",
                    background: "#fff",
                    boxShadow: "6px 6px 0px #000",
                    display: "flex",
                    gap: "1.5rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        border: "3px solid #000",
                        background: "#f5f5f5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "monospace",
                        fontSize: "0.7rem",
                        color: "#888",
                        flexShrink: 0,
                    }}
                >
                    [PHOTO]
                </div>
                <div>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.25rem" }}>
                        Dr. Ashwin Kumar
                    </h3>
                    <p style={{ fontFamily: "monospace", fontSize: "0.8rem", marginBottom: "0.5rem", color: "#555" }}>
                        Head of Department &amp; Professor
                    </p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.5, maxWidth: 500 }}>
                        Leading the department with a vision for innovation and excellence in tech entrepreneurship.
                    </p>
                </div>
            </div>
        </div>
    );
}
