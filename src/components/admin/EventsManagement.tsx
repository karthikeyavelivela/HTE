"use client";

import { useState } from "react";
import { useData } from "@/lib/context/DataContext";
import { type Event } from "@/lib/data/events";
import { Edit, Trash2, Plus, X, Search, Filter } from "lucide-react";

export default function EventsManagement() {
    const { events, addEvent, updateEvent, deleteEvent } = useData();
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<string>("All");
    const [editing, setEditing] = useState<Event | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [toast, setToast] = useState("");
    const [form, setForm] = useState<any>({ title: "", date: "", time: "", location: "", description: "", type: "Upcoming" });

    const filtered = events.filter((e) => {
        const ms = e.title.toLowerCase().includes(search.toLowerCase());
        const mt = filterType === "All" || e.type === filterType;
        return ms && mt;
    });

    const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };
    const openAdd = () => { setForm({ title: "", date: "", time: "", location: "", description: "", type: "Upcoming" }); setIsAdding(true); setEditing(null); };
    const openEdit = (ev: Event) => { setForm({ ...ev }); setEditing(ev); setIsAdding(false); };

    const save = () => {
        if (!form.title || !form.date) return;
        if (editing) { updateEvent(editing.id, { ...form }); showToast("Event updated!"); }
        else { addEvent({ ...form, id: Date.now() }); showToast("Event added!"); }
        setEditing(null); setIsAdding(false);
    };

    const confirmDelete = () => { if (deleteId !== null) { deleteEvent(deleteId); showToast("Event deleted!"); setDeleteId(null); } };

    return (
        <div style={{ color: "#000" }}>
            {toast && <div style={toastS}>{toast}</div>}
            <div style={hdr}><h2 style={h2S}>Events Management</h2><button onClick={openAdd} style={btnP}><Plus size={16} /> Add Event</button></div>
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <div style={{ position: "relative", flex: 1, minWidth: 200 }}><Search size={16} style={{ position: "absolute", left: 12, top: 12, color: "#888" }} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." style={{ ...iS, paddingLeft: 36 }} /></div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><Filter size={16} /><select value={filterType} onChange={(e) => setFilterType(e.target.value)} style={{ ...iS, width: "auto" }}><option value="All">All</option><option value="Upcoming">Upcoming</option><option value="Past">Past</option></select></div>
            </div>
            <div style={{ overflowX: "auto" }}>
                <table style={tS}>
                    <thead><tr style={{ background: "#000", color: "#fff" }}>{["Title", "Date", "Time", "Location", "Status", "Actions"].map(h => <th key={h} style={thS}>{h}</th>)}</tr></thead>
                    <tbody>
                        {filtered.map((ev) => (
                            <tr key={ev.id} style={{ borderBottom: "2px solid #000" }}>
                                <td style={{ ...tdS, fontWeight: 700 }}>{ev.title}</td>
                                <td style={{ ...tdS, fontFamily: "monospace" }}>{ev.date}</td>
                                <td style={{ ...tdS, fontFamily: "monospace" }}>{ev.time}</td>
                                <td style={tdS}>{ev.location}</td>
                                <td style={tdS}><span style={{ display: "inline-block", padding: "0.15rem 0.6rem", background: ev.type === "Upcoming" ? "#BFFF00" : "#ddd", border: "2px solid #000", fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700 }}>{ev.type}</span></td>
                                <td style={tdS}><div style={{ display: "flex", gap: "0.35rem" }}><button onClick={() => openEdit(ev)} style={iBtn}><Edit size={15} /></button><button onClick={() => setDeleteId(ev.id)} style={{ ...iBtn, borderColor: "#dc2626" }}><Trash2 size={15} color="#dc2626" /></button></div></td>
                            </tr>
                        ))}
                        {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: "2rem", textAlign: "center", fontFamily: "monospace", color: "#888" }}>No events found.</td></tr>}
                    </tbody>
                </table>
            </div>

            {(isAdding || editing) && (
                <Mdl title={editing ? "Edit Event" : "Add Event"} onClose={() => { setIsAdding(false); setEditing(null); }}>
                    <Fld label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} req />
                    <Fld label="Date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} req />
                    <Fld label="Time" value={form.time} onChange={(v) => setForm({ ...form, time: v })} />
                    <Fld label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
                    <div style={{ marginBottom: "0.75rem" }}><label style={lS}>Type</label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} style={iS}><option value="Upcoming">Upcoming</option><option value="Past">Past</option></select></div>
                    <div style={{ marginBottom: "0.75rem" }}><label style={lS}>Description</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...iS, resize: "vertical" as const }} /></div>
                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}><button onClick={save} style={btnP}>Save</button><button onClick={() => { setIsAdding(false); setEditing(null); }} style={btnSec}>Cancel</button></div>
                </Mdl>
            )}

            {deleteId !== null && (
                <Mdl title="Confirm Delete" onClose={() => setDeleteId(null)}>
                    <p style={{ marginBottom: "1rem" }}>Delete this event? This cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}><button onClick={confirmDelete} style={{ ...btnP, background: "#dc2626" }}>Delete</button><button onClick={() => setDeleteId(null)} style={btnSec}>Cancel</button></div>
                </Mdl>
            )}
        </div>
    );
}

function Mdl({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
    return (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }} onClick={onClose}><div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", border: "3px solid #000", boxShadow: "8px 8px 0px #000", padding: "2rem", maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "3px solid #000", paddingBottom: "0.75rem" }}><h3 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase" }}>{title}</h3><button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button></div>{children}</div></div>);
}
function Fld({ label, value, onChange, req }: { label: string; value: string; onChange: (v: string) => void; req?: boolean }) {
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
