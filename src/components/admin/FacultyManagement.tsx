"use client";

import { useState } from "react";
import { facultyData, type Faculty } from "@/lib/data/faculty";
import { Edit, Trash2, Plus, X, Search } from "lucide-react";

const emptyFaculty: Omit<Faculty, "id"> = {
    name: "", role: "", specialization: [], cabin: "", email: "",
    publications: 0, showOnHomepage: false, currentClasses: [],
    availableTimings: {}, awards: [], researchAreas: [],
};

export default function FacultyManagement() {
    const [items, setItems] = useState<Faculty[]>([...facultyData]);
    const [search, setSearch] = useState("");
    const [editing, setEditing] = useState<Faculty | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [toast, setToast] = useState("");

    const [form, setForm] = useState<any>({ ...emptyFaculty });

    const filtered = items.filter(
        (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.role.toLowerCase().includes(search.toLowerCase())
    );

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

    const openAdd = () => {
        setForm({ ...emptyFaculty });
        setIsAdding(true);
        setEditing(null);
    };

    const openEdit = (f: Faculty) => {
        setForm({ ...f, specialization: f.specialization.join(", "), researchAreas: f.researchAreas.join(", ") });
        setEditing(f);
        setIsAdding(false);
    };

    const save = () => {
        if (!form.name || !form.email) return;
        const spec = typeof form.specialization === "string" ? form.specialization.split(",").map((s: string) => s.trim()) : form.specialization;
        const ra = typeof form.researchAreas === "string" ? form.researchAreas.split(",").map((s: string) => s.trim()) : form.researchAreas;
        if (editing) {
            setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form, specialization: spec, researchAreas: ra } : p)));
            showToast("Faculty updated!");
        } else {
            const newItem: Faculty = { ...form, id: `FAC${Date.now()}`, specialization: spec, researchAreas: ra, currentClasses: [], availableTimings: {}, awards: [] };
            setItems((prev) => [...prev, newItem]);
            showToast("Faculty added!");
        }
        setEditing(null);
        setIsAdding(false);
    };

    const confirmDelete = () => {
        if (deleteId) {
            setItems((prev) => prev.filter((p) => p.id !== deleteId));
            showToast("Faculty deleted!");
            setDeleteId(null);
        }
    };

    return (
        <div style={{ color: "#000" }}>
            {/* Toast */}
            {toast && (
                <div style={{ position: "fixed", top: 20, right: 20, background: "#000", color: "#FFE500", padding: "0.75rem 1.5rem", fontWeight: 700, fontFamily: "monospace", zIndex: 9999, border: "2px solid #FFE500" }}>
                    {toast}
                </div>
            )}

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" }}>Faculty Management</h2>
                <button onClick={openAdd} style={btnPrimary}>
                    <Plus size={16} /> Add Faculty
                </button>
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: "1rem" }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#888" }} />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name or role..."
                    style={{ ...inputStyle, paddingLeft: 36 }}
                />
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ background: "#000", color: "#fff" }}>
                            <Th>Name</Th><Th>Role</Th><Th>Email</Th><Th>Publications</Th><Th>Actions</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((f) => (
                            <tr key={f.id} style={{ borderBottom: "2px solid #000" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                                <Td bold>{f.name}</Td>
                                <Td>{f.role}</Td>
                                <Td mono>{f.email}</Td>
                                <Td>{f.publications}</Td>
                                <Td>
                                    <div style={{ display: "flex", gap: "0.35rem" }}>
                                        <button onClick={() => openEdit(f)} style={iconBtn}><Edit size={15} /></button>
                                        <button onClick={() => setDeleteId(f.id)} style={{ ...iconBtn, borderColor: "#dc2626" }}><Trash2 size={15} color="#dc2626" /></button>
                                    </div>
                                </Td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", fontFamily: "monospace", color: "#888" }}>No faculty found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            {(isAdding || editing) && (
                <Modal title={editing ? "Edit Faculty" : "Add Faculty"} onClose={() => { setIsAdding(false); setEditing(null); }}>
                    <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label="Role / Position" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
                    <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
                    <Field label="Cabin" value={form.cabin} onChange={(v) => setForm({ ...form, cabin: v })} />
                    <Field label="Publications" value={form.publications} onChange={(v) => setForm({ ...form, publications: Number(v) })} type="number" />
                    <Field label="Specializations (comma-separated)" value={form.specialization} onChange={(v) => setForm({ ...form, specialization: v })} />
                    <Field label="Research Areas (comma-separated)" value={form.researchAreas} onChange={(v) => setForm({ ...form, researchAreas: v })} />
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                        <button onClick={save} style={btnPrimary}>Save</button>
                        <button onClick={() => { setIsAdding(false); setEditing(null); }} style={btnSecondary}>Cancel</button>
                    </div>
                </Modal>
            )}

            {/* Delete Confirmation */}
            {deleteId && (
                <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
                    <p style={{ marginBottom: "1rem" }}>Are you sure you want to delete this faculty member? This action cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button onClick={confirmDelete} style={{ ...btnPrimary, background: "#dc2626" }}>Delete</button>
                        <button onClick={() => setDeleteId(null)} style={btnSecondary}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ── Shared Inline Sub-Components ── */

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
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

function Field({ label, value, onChange, type = "text", required }: { label: string; value: any; onChange: (v: string) => void; type?: string; required?: boolean }) {
    return (
        <div style={{ marginBottom: "0.75rem" }}>
            <label style={{ display: "block", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem", color: "#000" }}>
                {label} {required && <span style={{ color: "red" }}>*</span>}
            </label>
            <input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
        </div>
    );
}

function Th({ children }: { children: React.ReactNode }) {
    return <th style={{ padding: "0.75rem", textAlign: "left", textTransform: "uppercase", fontFamily: "monospace", fontSize: "0.75rem", borderRight: "1px solid rgba(255,255,255,0.2)" }}>{children}</th>;
}

function Td({ children, bold, mono }: { children: React.ReactNode; bold?: boolean; mono?: boolean }) {
    return <td style={{ padding: "0.75rem", fontSize: "0.85rem", borderRight: "1px solid #eee", fontWeight: bold ? 700 : 400, fontFamily: mono ? "monospace" : "inherit" }}>{children}</td>;
}

/* ── Style Constants ── */

const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0.65rem", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.85rem", outline: "none", color: "#000", background: "#fff",
};

const tableStyle: React.CSSProperties = {
    width: "100%", borderCollapse: "collapse", border: "3px solid #000",
};

const btnPrimary: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.25rem",
    background: "#000", color: "#fff", border: "2px solid #000", fontWeight: 700, fontSize: "0.85rem",
    textTransform: "uppercase", cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
    ...btnPrimary, background: "#fff", color: "#000",
};

const iconBtn: React.CSSProperties = {
    padding: "0.4rem", border: "2px solid #000", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
};
