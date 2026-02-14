"use client";

import { useState } from "react";
import { useData } from "@/lib/context/DataContext";
import { type Faculty } from "@/lib/data/faculty";
import { Edit, Trash2, Plus, X, Search } from "lucide-react";

const emptyFaculty: Omit<Faculty, "id"> = {
    name: "", role: "", specialization: [], cabin: "", email: "",
    publications: 0, showOnHomepage: false, currentClasses: [],
    availableTimings: {}, awards: [], researchAreas: [],
};

export default function FacultyManagement() {
    const { faculty, addFaculty, updateFaculty, deleteFaculty } = useData();
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState<Faculty | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState("");
    const [form, setForm] = useState<any>({ ...emptyFaculty });

    const filtered = faculty.filter(
        (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
    );

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

    const openAdd = () => { setForm({ ...emptyFaculty }); setIsAdding(true); setEditing(null); };
    const openEdit = (f: Faculty) => { setForm({ ...f, specialization: f.specialization.join(", "), researchAreas: f.researchAreas.join(", ") }); setEditing(f); setIsAdding(false); };

    const save = () => {
        if (!form.name || !form.email) return;
        const spec = typeof form.specialization === "string" ? form.specialization.split(",").map((s: string) => s.trim()) : form.specialization;
        const ra = typeof form.researchAreas === "string" ? form.researchAreas.split(",").map((s: string) => s.trim()) : form.researchAreas;
        if (editing) {
            updateFaculty(editing.id, { ...form, specialization: spec, researchAreas: ra });
            showToast("Faculty updated!");
        } else {
            addFaculty({ ...form, id: `FAC${Date.now()}`, specialization: spec, researchAreas: ra, currentClasses: [], availableTimings: {}, awards: [] });
            showToast("Faculty added!");
        }
        setEditing(null); setIsAdding(false);
    };

    const confirmDelete = () => {
        if (deleteId) { deleteFaculty(deleteId); showToast("Faculty deleted!"); setDeleteId(null); }
    };

    return (
        <div style={{ color: "#000" }}>
            {toast && <div style={toastS}>{toast}</div>}
            <div style={hdr}><h2 style={h2S}>Faculty Management</h2><button onClick={openAdd} style={btnP}><Plus size={16} /> Add Faculty</button></div>

            <div style={{ position: "relative", marginBottom: "1rem" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#888" }} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or role..." style={{ ...iS, paddingLeft: 36 }} />
            </div>

            <div style={{ overflowX: "auto" }}>
                <table style={tS}>
                    <thead><tr style={{ background: "#000", color: "#fff" }}>
                        {["Name", "Role", "Email", "Publications", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}
                    </tr></thead>
                    <tbody>
                        {filtered.map((f) => (
                            <tr key={f.id} style={{ borderBottom: "2px solid #000" }}>
                                <td style={{ ...tdS, fontWeight: 700 }}>{f.name}</td>
                                <td style={tdS}>{f.role}</td>
                                <td style={{ ...tdS, fontFamily: "monospace" }}>{f.email}</td>
                                <td style={tdS}>{f.publications}</td>
                                <td style={tdS}>
                                    <div style={{ display: "flex", gap: "0.35rem" }}>
                                        <button onClick={() => openEdit(f)} style={iBtn}><Edit size={15} /></button>
                                        <button onClick={() => setDeleteId(f.id)} style={{ ...iBtn, borderColor: "#dc2626" }}><Trash2 size={15} color="#dc2626" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", fontFamily: "monospace", color: "#888" }}>No faculty found.</td></tr>}
                    </tbody>
                </table>
            </div>

            {(isAdding || editing) && (
                <Mdl title={editing ? "Edit Faculty" : "Add Faculty"} onClose={() => { setIsAdding(false); setEditing(null); }}>
                    <Fld label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} req />
                    <Fld label="Role / Position" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
                    <Fld label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} req />
                    <Fld label="Cabin" value={form.cabin} onChange={(v) => setForm({ ...form, cabin: v })} />
                    <Fld label="Publications" value={form.publications} onChange={(v) => setForm({ ...form, publications: Number(v) })} />
                    <Fld label="Specializations (comma-separated)" value={form.specialization} onChange={(v) => setForm({ ...form, specialization: v })} />
                    <Fld label="Research Areas (comma-separated)" value={form.researchAreas} onChange={(v) => setForm({ ...form, researchAreas: v })} />
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                        <button onClick={save} style={btnP}>Save</button>
                        <button onClick={() => { setIsAdding(false); setEditing(null); }} style={btnSec}>Cancel</button>
                    </div>
                </Mdl>
            )}

            {deleteId && (
                <Mdl title="Confirm Delete" onClose={() => setDeleteId(null)}>
                    <p style={{ marginBottom: "1rem" }}>Are you sure? This action cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button onClick={confirmDelete} style={{ ...btnP, background: "#dc2626" }}>Delete</button>
                        <button onClick={() => setDeleteId(null)} style={btnSec}>Cancel</button>
                    </div>
                </Mdl>
            )}
        </div>
    );
}

function Mdl({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
    return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", border: "3px solid #000", boxShadow: "8px 8px 0px #000", padding: "2rem", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "3px solid #000", paddingBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase" }}>{title}</h3>
                    <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

function Fld({ label, value, onChange, req }: { label: string; value: string | number; onChange: (v: string) => void; req?: boolean }) {
    return <div style={{ marginBottom: "0.75rem" }}><label style={lS}>{label} {req && <span style={{ color: "red" }}>*</span>}</label><input value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={iS} /></div>;
}

const toastS: React.CSSProperties = { position: "fixed", top: 20, right: 20, background: "#000", color: "#FFE500", padding: "0.75rem 1.5rem", fontWeight: 700, fontFamily: "monospace", zIndex: 9999, border: "2px solid #FFE500" };
const hdr: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" };
const h2S: React.CSSProperties = { fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" };
const lS: React.CSSProperties = { display: "block", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem", color: "#000" };
const iS: React.CSSProperties = { width: "100%", padding: "0.65rem", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.85rem", outline: "none", color: "#000", background: "#fff" };
const tS: React.CSSProperties = { width: "100%", borderCollapse: "collapse", border: "3px solid #000" };
const thS: React.CSSProperties = { padding: "0.75rem", textAlign: "left", textTransform: "uppercase", fontFamily: "monospace", fontSize: "0.75rem" };
const tdS: React.CSSProperties = { padding: "0.75rem", fontSize: "0.85rem", borderRight: "1px solid #eee" };
const btnP: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.25rem", background: "#000", color: "#fff", border: "2px solid #000", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer" };
const btnSec: React.CSSProperties = { ...btnP, background: "#fff", color: "#000" };
const iBtn: React.CSSProperties = { padding: "0.4rem", border: "2px solid #000", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center" };
