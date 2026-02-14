"use client";

import { useState } from "react";
import { LayoutDashboard, Users, Trophy, Calendar, FolderOpen, LogOut, Menu, X } from "lucide-react";
import DashboardOverview from "./DashboardOverview";
import FacultyManagement from "./FacultyManagement";
import AwardsManagement from "./AwardsManagement";
import EventsManagement from "./EventsManagement";
import ProjectsManagement from "./ProjectsManagement";

const SECTIONS = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "faculty", label: "Faculty", icon: Users },
    { key: "awards", label: "Awards", icon: Trophy },
    { key: "events", label: "Events", icon: Calendar },
    { key: "projects", label: "Projects", icon: FolderOpen },
] as const;

type SectionKey = (typeof SECTIONS)[number]["key"];

export default function AdminLayout({ onLogout }: { onLogout: () => void }) {
    const [active, setActive] = useState<SectionKey>("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const renderContent = () => {
        switch (active) {
            case "dashboard": return <DashboardOverview />;
            case "faculty": return <FacultyManagement />;
            case "awards": return <AwardsManagement />;
            case "events": return <EventsManagement />;
            case "projects": return <ProjectsManagement />;
        }
    };

    const currentLabel = SECTIONS.find((s) => s.key === active)?.label ?? "Dashboard";

    return (
        <div style={{ display: "flex", minHeight: "100vh", background: "#EAEAEA", color: "#000" }}>
            {/* Sidebar - Desktop */}
            <aside
                style={{
                    width: 240, flexShrink: 0, background: "#000", color: "#fff",
                    display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 100,
                    transform: sidebarOpen ? "translateX(0)" : undefined,
                }}
                className="admin-sidebar-desktop"
            >
                <div style={{ padding: "1.5rem", borderBottom: "2px solid #333" }}>
                    <h1 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: 2 }}>
                        CSE-HTE
                    </h1>
                    <div style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#888", marginTop: "0.25rem" }}>
                        ADMIN PANEL v1.0
                    </div>
                </div>

                <nav style={{ flex: 1, padding: "1rem 0" }}>
                    {SECTIONS.map((s) => {
                        const isActive = active === s.key;
                        return (
                            <button
                                key={s.key}
                                onClick={() => { setActive(s.key); setSidebarOpen(false); }}
                                style={{
                                    display: "flex", alignItems: "center", gap: "0.75rem", width: "100%",
                                    padding: "0.75rem 1.5rem", border: "none", cursor: "pointer",
                                    background: isActive ? "#FFE500" : "transparent",
                                    color: isActive ? "#000" : "#ccc",
                                    fontWeight: isActive ? 800 : 500, fontSize: "0.85rem", textTransform: "uppercase",
                                    textAlign: "left", transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#222"; }}
                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                            >
                                <s.icon size={18} /> {s.label}
                            </button>
                        );
                    })}
                </nav>

                <div style={{ padding: "1rem 1.5rem", borderTop: "2px solid #333" }}>
                    <button
                        onClick={onLogout}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.5rem", width: "100%",
                            padding: "0.65rem", border: "2px solid #dc2626", background: "transparent",
                            color: "#dc2626", cursor: "pointer", fontWeight: 700, fontSize: "0.8rem",
                            textTransform: "uppercase",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#dc2626"; e.currentTarget.style.color = "#fff"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#dc2626"; }}
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 90 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div style={{ flex: 1, marginLeft: 240, minHeight: "100vh" }}>
                {/* Header */}
                <header
                    style={{
                        background: "#fff", borderBottom: "3px solid #000", padding: "1rem 2rem",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        position: "sticky", top: 0, zIndex: 50,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            style={{ border: "none", background: "none", cursor: "pointer", display: "none" }}
                            className="admin-mobile-menu"
                        >
                            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase" }}>
                            {currentLabel}
                        </h2>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#888" }}>
                        Admin Session Active
                    </div>
                </header>

                {/* Page Content */}
                <main style={{ padding: "2rem" }}>
                    {renderContent()}
                </main>
            </div>

            {/* Responsive overrides */}
            <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop {
            transform: ${sidebarOpen ? "translateX(0)" : "translateX(-100%)"} !important;
          }
          .admin-mobile-menu {
            display: block !important;
          }
          div[style*="marginLeft: 240"] {
            margin-left: 0 !important;
          }
        }
      `}</style>
        </div>
    );
}
