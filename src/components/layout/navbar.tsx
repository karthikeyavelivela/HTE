"use client";

import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import styles from './navbar.module.css';

export function Navbar() {
    const links = [
        { href: '/', label: 'Home' },
        { href: '/faculty', label: 'Faculty' },
        { href: '/projects', label: 'Projects' },
        { href: '/awards', label: 'Awards' },
        { href: '/events', label: 'Events' },
    ];

    return (
        <nav className={styles.nav}>
            <Container className="flex items-center justify-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" className={styles.brand}>
                    CSE-HTE
                </Link>

                <div className={styles.links}>
                    {links.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.link}>
                            {link.label}
                        </Link>
                    ))}
                    <Button variant="primary" size="sm" className="ml-4" style={{ marginLeft: '1.5rem' }}>
                        Contact
                    </Button>
                </div>

                <Button className={styles.mobileMenu} variant="outline" size="sm">
                    Menu
                </Button>
            </Container>
        </nav>
    );
}
