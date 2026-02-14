"use client";

import { useState } from "react";
import { useData } from "@/lib/context/DataContext";
import { type Project } from "@/lib/data/projects";
import { Edit, Trash2, Plus, X, Search, Filter } from "lucide-react";

const statuses: Project["status"][] = ["Ongoing", "Completed"];
const cats: Project["category"][] = ["Student", "Faculty", "Research"];

export default function ProjectsManagement() {
    const { projects, addProject, updateProject, deleteProject } = useData();
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState<string>("All");
    const [editing, setEditing] = useState<Project | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState("");
    const [form, setForm] = useState<any>({ title: "", category: "Student", status: "Ongoing", description: "", team: "", techStack: "" });

    const filtered = projects.filter((p) => {
        const ms = p.title.toLowerCase().includes(search.toLowerCase());
        const mf = filterStatus === "All" || p.status === filterStatus;
        return ms && mf;
    });

    const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };
    const openAdd = () => { setForm({ title: "", category: "Student", status: "Ongoing", description: "", team: "", techStack: "" }); setIsAdding(true); setEditing(null); };
    const openEdit = (p: Project) => { setForm({ ...p, team: p.team.join(", "), techStack: p.techStack.join(", ") }); setEditing(p); setIsAdding(false); };

    const save = () => {
        if (!form.title) return;
        const team = typeof form.team === "string" ? form.team.split(",").map((s: string) => s.trim()).filter(Boolean) : form.team;
        const tech = typeof form.techStack === "string" ? form.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) : form.techStack;
        if (editing) { updateProject(editing.id, { ...form, team, techStack: tech }); showToast("Project updated!"); }
        else { addProject({ ...form, id: `PROJ-${Date.now()}`, team, techStack: tech, timeline: [], links: [] }); showToast("Project added!"); }
        setEditing(null); setIsAdding(false);
    };

    const confirmDelete = () => { if (deleteId) { deleteProject(deleteId); showToast("Project deleted!"); setDeleteId(null); } };

    return (
        <div style={{ color: "#000" }}>
            {toast && <div style={toastStyle}>{toast}</div>}
            <div style={headerRow}><h2 style={h2Style}>Projects Management</h2><button onClick={openAdd} style={btnP}><Plus size={16} /> Add Project</button></div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}><Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#888" }} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search projects..." style={{ ...iS, paddingLeft: 36 }} /></div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Filter size={16} /><select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ ...iS, width: "auto" }}><option value="All">All Status</option>{statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
            </div>
            <div style={{ overflowX: "auto" }}>
                <table style={tS}>
                    <thead><tr style={{ background: "#000", color: "#fff" }}>{["Title", "Category", "Status", "Team", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p.id} style={{ borderBottom: "2px solid #000" }}>
                                <td style={{ ...tdS, fontWeight: 700 }}>{p.title}</td><td style={tdS}>{p.category}</td>
                                <td style={tdS}><span style={{ display: "inline-block", padding: "0.15rem 0.6rem", background: p.status === "Ongoing" ? "#00F0FF" : "#BFFF00", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700 }}>{p.status}</span></td>
                                <td style={{ ...tdS, fontFamily: "monospace", fontSize: "0.75rem" }}>{p.team.join(", ")}</td>
                                <td style={tdS}><div style={{ display: "flex", gap: "0.35rem" }}><button onClick={() => openEdit(p)} style={iBtn}><Edit size={15} /></button><button onClick={() => setDeleteId(p.id)} style={{ ...iBtn, borderColor: "#dc2626" }}><Trash2 size={15} color="#dc2626" /></button></div></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", fontFamily: "monospace", color: "#888" }}>No projects found.</td></tr>}
                    </tbody>
                </table>
            </div>

            {(isAdding || editing) && (
                <Mdl title={editing ? "Edit Project" : "Add Project"} onClose={() => { setIsAdding(false); setEditing(null); }}>
                    <Fld label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                    <div style={{ marginBottom: "0.75rem" }}><label style={lS}>Category</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={iS}>{cats.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div style={{ marginBottom: "0.75rem" }}><label style={lS}>Status</label><select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={iS}>{statuses.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    <Fld label="Team (comma-separated)" value={form.team} onChange={(v) => setForm({ ...form, team: v })} />
                    <Fld label="Tech Stack (comma-separated)" value={form.techStack} onChange={(v) => setForm({ ...form, techStack: v })} />
                    <div style={{ marginBottom: "0.75rem" }}><label style={lS}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...iS, resize: "vertical" }} /></div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}><button onClick={save} style={btnP}>Save</button><button onClick={() => { setIsAdding(false); setEditing(null); }} style={btnS}>Cancel</button></div>
                </Mdl>
            )}

            {deleteId && (
                <Mdl title="Confirm Delete" onClose={() => setDeleteId(null)}>
                    <p style={{ marginBottom: "1rem" }}>Delete this project? This cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}><button onClick={confirmDelete} style={{ ...btnP, background: "#dc2626" }}>Delete</button><button onClick={() => setDeleteId(null)} style={btnS}>Cancel</button></div>
                </Mdl>
            )}
        </div>
    );
}

function Mdl({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
    return (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}><div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", border: "3px solid #000", boxShadow: "8px 8px 0px #000", padding: "2rem", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "3px solid #000", paddingBottom: "0.75rem" }}><h3 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase" }}>{title}</h3><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button></div>{children}</div></div>);
}
function Fld({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
    return <div style={{ marginBottom: "0.75rem" }}><label style={lS}>{label} {required && <span style={{ color: "red" }}>*</span>}</label><input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={iS} /></div>;
}

const toastStyle: React.CSSProperties = { position: "fixed", top: 20, right: 20, background: "#000", color: "#FFE500", padding: "0.75rem 1.5rem", fontWeight: 700, fontFamily: "monospace", zIndex: 9999, border: "2px solid #FFE500" };
const headerRow: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" };
const h2Style: React.CSSProperties = { fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" };
const lS: React.CSSProperties = { display: "block", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem", color: "#000" };
const iS: React.CSSProperties = { width: "100%", padding: "0.65rem", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.85rem", outline: "none", color: "#000", background: "#fff" };
const tS: React.CSSProperties = { width: "100%", borderCollapse: "collapse", border: "3px solid #000" };
const thS: React.CSSProperties = { padding: "0.75rem", textAlign: "left", textTransform: "uppercase", fontFamily: "monospace", fontSize: "0.75rem", borderRight: "1px solid rgba(255,255,255,0.2)" };
const tdS: React.CSSProperties = { padding: "0.75rem", fontSize: "0.85rem", borderRight: "1px solid #eee" };
const btnP: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.25rem", background: "#000", color: "#fff", border: "2px solid #000", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer" };
const btnS: React.CSSProperties = { ...btnP, background: "#fff", color: "#000" };
const iBtn: React.CSSProperties = { padding: "0.4rem", border: "2px solid #000", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center" };
