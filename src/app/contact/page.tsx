"use client";

import { SlideTabsNavbar } from '@/components/layout/slide-tabs-navbar';
import { Footer } from '@/components/layout/footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import styles from './contact.module.css';

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#EAEAEA]">
            <SlideTabsNavbar />

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Contact Info */}
                    <div>
                        <h1 className={styles.heading}>Get In Touch</h1>

                        <div className={styles.card}>
                            <div className={styles.icon}><Mail size={24} /></div>
                            <div>
                                <h3 className={styles.cardTitle}>Email</h3>
                                <p className={styles.cardText}>admissions@cse.hte.edu</p>
                                <p className={styles.cardText}>research@cse.hte.edu</p>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.icon}><Phone size={24} /></div>
                            <div>
                                <h3 className={styles.cardTitle}>Phone</h3>
                                <p className={styles.cardText}>+91 98765 43210</p>
                                <p className={styles.cardText}>+91 040 1234 5678</p>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.icon}><MapPin size={24} /></div>
                            <div>
                                <h3 className={styles.cardTitle}>Campus</h3>
                                <p className={styles.cardText}>
                                    CSE-HTE Block, Innovation Park,<br />
                                    Tech University Campus,<br />
                                    Hyderabad, India 500032
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={styles.formContainer}>
                        <h2 className={styles.formTitle}>
                            <Send /> Send Message
                        </h2>
                        <form>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Name</label>
                                <input type="text" className={styles.input} placeholder="Karthikeya V." />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Email</label>
                                <input type="email" className={styles.input} placeholder="you@example.com" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Subject</label>
                                <select className={styles.select}>
                                    <option>General Inquiry</option>
                                    <option>Admissions</option>
                                    <option>Research Collaboration</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Message</label>
                                <textarea rows={5} className={styles.textarea} placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn}>
                                Submit Query
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
