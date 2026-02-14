"use client";

import { useState } from "react";
import { awardsData, type AwardItem } from "@/lib/data/awards";
import { Edit, Trash2, Plus, X, Search, Filter } from "lucide-react";

const categories: AwardItem["category"][] = ["Department", "Hackathon", "Research", "Student"];

export default function AwardsManagement() {
    const [items, setItems] = useState<AwardItem[]>([...awardsData]);
    const [search, setSearch] = useState("");
    const [filterCat, setFilterCat] = useState<string>("All");
    const [editing, setEditing] = useState<AwardItem | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState("");

    const [form, setForm] = useState<any>({ title: "", recipient: "", category: "Department", year: new Date().getFullYear(), description: "" });

    const filtered = items.filter((a) => {
        const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.recipient.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === "All" || a.category === filterCat;
        return matchSearch && matchCat;
    });

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

    const openAdd = () => { setForm({ title: "", recipient: "", category: "Department", year: new Date().getFullYear(), description: "" }); setIsAdding(true); setEditing(null); };

    const openEdit = (a: AwardItem) => { setForm({ ...a }); setEditing(a); setIsAdding(false); };

    const save = () => {
        if (!form.title || !form.recipient) return;
        if (editing) {
            setItems((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form, year: Number(form.year) } : p)));
            showToast("Award updated!");
        } else {
            setItems((prev) => [...prev, { ...form, id: Date.now(), year: Number(form.year) }]);
            showToast("Award added!");
        }
        setEditing(null); setIsAdding(false);
    };

    const confirmDelete = () => {
        if (deleteId !== null) { setItems((prev) => prev.filter((p) => p.id !== deleteId)); showToast("Award deleted!"); setDeleteId(null); }
    };

    return (
        <div style={{ color: "#000" }}>
            {toast && <Toast msg={toast} />}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 900, textTransform: "uppercase" }}>Awards Management</h2>
                <button onClick={openAdd} style={btnPrimary}><Plus size={16} /> Add Award</button>
            </div>

            {/* Search + Filter */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
                    <Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#888" }} />
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search awards..." style={{ ...inputStyle, paddingLeft: 36 }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <Filter size={16} />
                    <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} style={{ ...inputStyle, width: "auto" }}>
                        <option value="All">All Categories</option>
                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto" }}>
                <table style={tableStyle}>
                    <thead><tr style={{ background: "#000", color: "#fff" }}>
                        <Th>Title</Th><Th>Recipient</Th><Th>Category</Th><Th>Year</Th><Th>Actions</Th>
                    </tr></thead>
                    <tbody>
                        {filtered.map((a) => (
                            <tr key={a.id} style={{ borderBottom: "2px solid #000" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                <Td bold>{a.title}</Td>
                                <Td>{a.recipient}</Td>
                                <Td><Badge color={catColor(a.category)}>{a.category}</Badge></Td>
                                <Td mono>{a.year}</Td>
                                <Td>
                                    <div style={{ display: "flex", gap: "0.35rem" }}>
                                        <button onClick={() => openEdit(a)} style={iconBtn}><Edit size={15} /></button>
                                        <button onClick={() => setDeleteId(a.id)} style={{ ...iconBtn, borderColor: "#dc2626" }}><Trash2 size={15} color="#dc2626" /></button>
                                    </div>
                                </Td>
                            </tr>
                        ))}
                        {filtered.length === 0 && <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", fontFamily: "monospace", color: "#888" }}>No awards found.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {(isAdding || editing) && (
                <Modal title={editing ? "Edit Award" : "Add Award"} onClose={() => { setIsAdding(false); setEditing(null); }}>
                    <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
                    <Field label="Recipient" value={form.recipient} onChange={(v) => setForm({ ...form, recipient: v })} required />
                    <div style={{ marginBottom: "0.75rem" }}>
                        <label style={labelStyle}>Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <Field label="Year" value={form.year} onChange={(v) => setForm({ ...form, year: v })} type="number" />
                    <div style={{ marginBottom: "0.75rem" }}>
                        <label style={labelStyle}>Description</label>
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                        <button onClick={save} style={btnPrimary}>Save</button>
                        <button onClick={() => { setIsAdding(false); setEditing(null); }} style={btnSecondary}>Cancel</button>
                    </div>
                </Modal>
            )}

            {deleteId !== null && (
                <Modal title="Confirm Delete" onClose={() => setDeleteId(null)}>
                    <p style={{ marginBottom: "1rem" }}>Delete this award? This cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                        <button onClick={confirmDelete} style={{ ...btnPrimary, background: "#dc2626" }}>Delete</button>
                        <button onClick={() => setDeleteId(null)} style={btnSecondary}>Cancel</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

/* ── Sub-components ── */

function Toast({ msg }: { msg: string }) {
    return <div style={{ position: "fixed", top: 20, right: 20, background: "#000", color: "#FFE500", padding: "0.75rem 1.5rem", fontWeight: 700, fontFamily: "monospace", zIndex: 9999, border: "2px solid #FFE500" }}>{msg}</div>;
}

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
            <label style={labelStyle}>{label} {required && <span style={{ color: "red" }}>*</span>}</label>
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
function Badge({ children, color }: { children: React.ReactNode; color: string }) {
    return <span style={{ display: "inline-block", padding: "0.15rem 0.6rem", background: color, border: "2px solid #000", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase" }}>{children}</span>;
}

function catColor(c: string) {
    switch (c) { case "Hackathon": return "#FFE500"; case "Research": return "#00F0FF"; case "Department": return "#BFFF00"; default: return "#FF006E"; }
}

/* ── Styles ── */
const labelStyle: React.CSSProperties = { display: "block", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.25rem", color: "#000" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "0.65rem", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.85rem", outline: "none", color: "#000", background: "#fff" };
const tableStyle: React.CSSProperties = { width: "100%", borderCollapse: "collapse", border: "3px solid #000" };
const btnPrimary: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1.25rem", background: "#000", color: "#fff", border: "2px solid #000", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", cursor: "pointer" };
const btnSecondary: React.CSSProperties = { ...btnPrimary, background: "#fff", color: "#000" };
const iconBtn: React.CSSProperties = { padding: "0.4rem", border: "2px solid #000", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center" };
