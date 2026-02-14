"use client";

import { useState, useEffect } from "react";
import { Lock, Shield } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check session on mount
    useEffect(() => {
        const session = sessionStorage.getItem("admin_auth");
        if (session === "true") setIsLoggedIn(true);
        setLoading(false);
    }, []);

    const handleLogin = () => {
        if (password === "123456") {
            sessionStorage.setItem("admin_auth", "true");
            setIsLoggedIn(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("admin_auth");
        setIsLoggedIn(false);
        setPassword("");
    };

    // Prevent flash
    if (loading) {
        return (
            <div style={{ minHeight: "100vh", background: "#EAEAEA", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 50 }}>
                <div style={{ fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, color: "#000" }}>
                    LOADING...
                </div>
            </div>
        );
    }

    // ── LOGIN SCREEN ──
    if (!isLoggedIn) {
        return (
            <div
                style={{
                    minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                    background: "#000", position: "relative", zIndex: 50,
                }}
            >
                {/* Decorative grid */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

                <div
                    style={{
                        background: "#fff", border: "4px solid #000", padding: "3rem 2.5rem",
                        boxShadow: "12px 12px 0px #FFE500", maxWidth: 440, width: "100%",
                        margin: "0 1rem", position: "relative",
                    }}
                >
                    {/* Badge */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
                        <div style={{ width: 60, height: 60, background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Shield size={28} color="#FFE500" />
                        </div>
                    </div>

                    <h1 style={{ fontSize: "2rem", fontWeight: 900, textTransform: "uppercase", textAlign: "center", borderBottom: "4px solid #000", paddingBottom: "1rem", marginBottom: "2rem", color: "#000" }}>
                        Admin Access
                    </h1>

                    <label style={{ display: "block", fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem", color: "#000" }}>
                        Security Code
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(false); }}
                        onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
                        placeholder="Enter access code..."
                        autoFocus
                        style={{
                            width: "100%", padding: "1rem", border: "3px solid #000", fontFamily: "monospace",
                            fontSize: "1.1rem", outline: "none", marginBottom: "1rem", color: "#000", background: "#fff",
                        }}
                    />

                    {error && (
                        <div style={{ background: "#FEE2E2", border: "2px solid #dc2626", padding: "0.5rem", textAlign: "center", color: "#dc2626", fontFamily: "monospace", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                            ⚠ ACCESS DENIED — Invalid code
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handleLogin}
                        style={{
                            width: "100%", padding: "1rem", background: "#000", color: "#FFE500",
                            border: "3px solid #000", fontSize: "1.1rem", fontWeight: 900,
                            cursor: "pointer", display: "flex", alignItems: "center",
                            justifyContent: "center", gap: "0.5rem", textTransform: "uppercase",
                            transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#222"; e.currentTarget.style.boxShadow = "0 0 0 3px #FFE500"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#000"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                        <Lock size={20} /> Unlock Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // ── DASHBOARD ──
    return <AdminLayout onLogout={handleLogout} />;
}
