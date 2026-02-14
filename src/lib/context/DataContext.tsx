"use client";

import {
    createContext, useContext, useState, useEffect, useCallback,
    type ReactNode,
} from "react";
import { facultyData as defaultFaculty, type Faculty } from "@/lib/data/faculty";
import { awardsData as defaultAwards, type AwardItem } from "@/lib/data/awards";
import { eventsData as defaultEvents, type Event } from "@/lib/data/events";
import { projectsData as defaultProjects, type Project } from "@/lib/data/projects";

/* ─── Types ─── */
interface DataContextType {
    faculty: Faculty[];
    awards: AwardItem[];
    events: Event[];
    projects: Project[];

    addFaculty: (f: Faculty) => void;
    updateFaculty: (id: string, f: Partial<Faculty>) => void;
    deleteFaculty: (id: string) => void;

    addAward: (a: AwardItem) => void;
    updateAward: (id: number, a: Partial<AwardItem>) => void;
    deleteAward: (id: number) => void;

    addEvent: (e: Event) => void;
    updateEvent: (id: number, e: Partial<Event>) => void;
    deleteEvent: (id: number) => void;

    addProject: (p: Project) => void;
    updateProject: (id: string, p: Partial<Project>) => void;
    deleteProject: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

/* ─── Hook ─── */
export function useData(): DataContextType {
    const ctx = useContext(DataContext);
    if (!ctx) throw new Error("useData must be used within DataProvider");
    return ctx;
}

/* ─── Helpers ─── */
const LS_KEY = "hte_admin_data";

function loadFromStorage(): {
    faculty?: Faculty[];
    awards?: AwardItem[];
    events?: Event[];
    projects?: Project[];
} | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveToStorage(data: {
    faculty: Faculty[];
    awards: AwardItem[];
    events: Event[];
    projects: Project[];
}) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch { /* ignore quota errors */ }
}

/* ─── Provider ─── */
export function DataProvider({ children }: { children: ReactNode }) {
    const [faculty, setFaculty] = useState<Faculty[]>([...defaultFaculty]);
    const [awards, setAwards] = useState<AwardItem[]>([...defaultAwards]);
    const [events, setEvents] = useState<Event[]>([...defaultEvents]);
    const [projects, setProjects] = useState<Project[]>([...defaultProjects]);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const stored = loadFromStorage();
        if (stored) {
            if (stored.faculty) setFaculty(stored.faculty);
            if (stored.awards) setAwards(stored.awards);
            if (stored.events) setEvents(stored.events);
            if (stored.projects) setProjects(stored.projects);
        }
        setLoaded(true);
    }, []);

    // Persist to localStorage on change
    useEffect(() => {
        if (!loaded) return;
        saveToStorage({ faculty, awards, events, projects });
    }, [faculty, awards, events, projects, loaded]);

    /* ── Faculty CRUD ── */
    const addFaculty = useCallback((f: Faculty) => setFaculty((p) => [...p, f]), []);
    const updateFaculty = useCallback(
        (id: string, updates: Partial<Faculty>) =>
            setFaculty((p) => p.map((x) => (x.id === id ? { ...x, ...updates } : x))),
        []
    );
    const deleteFaculty = useCallback(
        (id: string) => setFaculty((p) => p.filter((x) => x.id !== id)),
        []
    );

    /* ── Awards CRUD ── */
    const addAward = useCallback((a: AwardItem) => setAwards((p) => [...p, a]), []);
    const updateAward = useCallback(
        (id: number, updates: Partial<AwardItem>) =>
            setAwards((p) => p.map((x) => (x.id === id ? { ...x, ...updates } : x))),
        []
    );
    const deleteAward = useCallback(
        (id: number) => setAwards((p) => p.filter((x) => x.id !== id)),
        []
    );

    /* ── Events CRUD ── */
    const addEvent = useCallback((e: Event) => setEvents((p) => [...p, e]), []);
    const updateEvent = useCallback(
        (id: number, updates: Partial<Event>) =>
            setEvents((p) => p.map((x) => (x.id === id ? { ...x, ...updates } : x))),
        []
    );
    const deleteEvent = useCallback(
        (id: number) => setEvents((p) => p.filter((x) => x.id !== id)),
        []
    );

    /* ── Projects CRUD ── */
    const addProject = useCallback((p: Project) => setProjects((prev) => [...prev, p]), []);
    const updateProject = useCallback(
        (id: string, updates: Partial<Project>) =>
            setProjects((prev) => prev.map((x) => (x.id === id ? { ...x, ...updates } : x))),
        []
    );
    const deleteProject = useCallback(
        (id: string) => setProjects((prev) => prev.filter((x) => x.id !== id)),
        []
    );

    return (
        <DataContext.Provider
            value={{
                faculty, awards, events, projects,
                addFaculty, updateFaculty, deleteFaculty,
                addAward, updateAward, deleteAward,
                addEvent, updateEvent, deleteEvent,
                addProject, updateProject, deleteProject,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
