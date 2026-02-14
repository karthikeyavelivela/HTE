"use client";

import Link from 'next/link';
import { Container } from './container';
import { MapPin, Mail, Phone } from 'lucide-react';
import styles from './footer.module.css';
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.mainGrid}>
                    {/* Brand Section */}
                    <div className={styles.brandSection}>
                        <h2 className={styles.logo}>
                            CSE-HTE
                        </h2>
                        <p className={styles.tagline}>
                            &lt;Innovate. Engineer. Entrepreneur. /&gt;
                        </p>
                        <p className={styles.description}>
                            Department of Computer Science & Engineering with Honours in Tech Entrepreneurship
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.linksSection}>
                        <h3 className={styles.sectionTitle}>Quick Links</h3>
                        <ul className={styles.linksList}>
                            <li><Link href="/" className={styles.link}>Home</Link></li>
                            <li><Link href="/faculty" className={styles.link}>Faculty</Link></li>
                            <li><Link href="/projects" className={styles.link}>Projects</Link></li>
                            <li><Link href="/awards" className={styles.link}>Awards</Link></li>
                            <li><Link href="/events" className={styles.link}>Events</Link></li>
                            <li><Link href="/clubs" className={styles.link}>Clubs</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className={styles.contactSection}>
                        <h3 className={styles.sectionTitle}>Contact Us</h3>
                        <div className={styles.contactList}>
                            <div className={styles.contactItem}>
                                <MapPin size={18} />
                                <span>University Campus, India</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail size={18} />
                                <span>info@cse-hte.edu</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Phone size={18} />
                                <span>+91 123 456 7890</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media - RevealLinks Style */}
                    <div className={styles.socialSection}>
                        <h3 className={styles.sectionTitle}>Follow Us</h3>
                        <div className="grid gap-2">
                            <FlipLink href="https://twitter.com">Twitter</FlipLink>
                            <FlipLink href="https://linkedin.com">Linkedin</FlipLink>
                            <FlipLink href="https://facebook.com">Facebook</FlipLink>
                            <FlipLink href="https://instagram.com">Instagram</FlipLink>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <div className={styles.copyright}>
                        © {new Date().getFullYear()} CSE-HTE. All Rights Reserved.
                    </div>
                    <div className={styles.bottomLinks}>
                        <Link href="/admin" className={styles.bottomLink}>Admin</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
                        <span className={styles.separator}>•</span>
                        <Link href="/terms" className={styles.bottomLink}>Terms of Service</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

const DURATION = 0.25;
const STAGGER = 0.025;

const FlipLink = ({ children, href }: { children: string; href: string }) => {
    return (
        <motion.a
            initial="initial"
            whileHover="hovered"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-6xl md:text-7xl lg:text-8xl text-white"
            style={{
                lineHeight: 0.9,
            }}
        >
            <div className="relative z-10">
                {children.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: 0,
                            },
                            hovered: {
                                y: "-100%",
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0 text-[#8B0000]">
                {children.split("").map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: "100%",
                            },
                            hovered: {
                                y: 0,
                            },
                        }}
                        transition={{
                            duration: DURATION,
                            ease: "easeInOut",
                            delay: STAGGER * i,
                        }}
                        className="inline-block"
                        key={i}
                    >
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    );
};
