"use client";

import { DataProvider } from "@/lib/context/DataContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return <DataProvider>{children}</DataProvider>;
}
