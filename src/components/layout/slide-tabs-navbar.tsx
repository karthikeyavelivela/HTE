"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';
import { Home, Users, Folder, Award, Calendar, LucideIcon, Shield, Mail } from "lucide-react";

// Icon mapping for mobile
const ICONS: Record<string, LucideIcon> = {
    Home: Home,
    Faculty: Users,
    Projects: Folder,
    Awards: Award,
    Events: Calendar,
    Clubs: Users, // Reusing Users for now, could be specific
    Admin: Shield,
    Contact: Mail
};

export const SlideTabsNavbar = () => {
    return (
        <div className={styles.navContainer}>
            <SlideTabs />
        </div>
    );
};

const SlideTabs = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <ul
            onMouseLeave={() => {
                setPosition((pv) => ({
                    ...pv,
                    opacity: 0,
                }));
            }}
            className={styles.navBar}
        >
            <Tab href="/" setPosition={setPosition}>Home</Tab>
            <Tab href="/faculty" setPosition={setPosition}>Faculty</Tab>
            <Tab href="/projects" setPosition={setPosition}>Projects</Tab>
            <Tab href="/awards" setPosition={setPosition}>Awards</Tab>
            <Tab href="/events" setPosition={setPosition}>Events</Tab>
            <Tab href="/clubs" setPosition={setPosition}>Clubs</Tab>
            <Tab href="/contact" setPosition={setPosition}>Contact</Tab>

            <Cursor position={position} />
        </ul>
    );
};

const Tab = ({ children, setPosition, href }: { children: React.ReactNode, setPosition: any, href: string }) => {
    const ref = useRef<HTMLLIElement>(null);
    const pathname = usePathname();
    const isActive = pathname === href;

    // Mobile Icon Logic
    const Icon = ICONS[children as string];

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref?.current) return;
                const { width } = ref.current.getBoundingClientRect();
                setPosition({
                    left: ref.current.offsetLeft,
                    width,
                    opacity: 1,
                });
            }}
            className={`${styles.tabItem} ${isActive ? styles.tabItemActive : ''}`}
        >
            <Link href={href} className="flex items-center justify-center w-full h-full">
                <span className="hidden md:block">{children}</span>
                <span className="md:hidden block">
                    {Icon ? <Icon size={20} /> : children}
                </span>
            </Link>
        </li>
    );
};

const Cursor = ({ position }: { position: any }) => {
    return (
        <motion.li
            animate={{
                ...position,
            }}
            className={styles.cursor}
        />
    );
};
