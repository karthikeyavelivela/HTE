"use client";

import Link from 'next/link';
import { Container } from './container';
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import styles from './footer.module.css';

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

                    {/* Social Media */}
                    <div className={styles.socialSection}>
                        <h3 className={styles.sectionTitle}>Follow Us</h3>
                        <div className={styles.socialLinks}>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Twitter size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Linkedin size={24} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Github size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                                <Instagram size={24} />
                            </a>
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
