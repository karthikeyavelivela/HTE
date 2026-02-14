export interface AwardItem {
    id: number;
    title: string;
    recipient: string;
    category: "Department" | "Hackathon" | "Research" | "Student";
    year: number;
    description: string;
    image?: string;
}

export const awardsData: AwardItem[] = [
    {
        id: 1,
        title: "National Hackathon 2025 Winners",
        recipient: "Team CodeWarriors (3rd Year)",
        category: "Hackathon",
        year: 2025,
        description: "Built an AI-driven disaster relief coordination platform. Led by Vishnu & Sujith.",
    },
    {
        id: 2,
        title: "Best Research Paper",
        recipient: "Dr. Nithya Menon & Research Team",
        category: "Research",
        year: 2024,
        description: "Paper on 'Optimizing Neural Networks for Edge Devices' accepted at IEEE CloudCom.",
    },
    {
        id: 3,
        title: "Innovation in Education Award",
        recipient: "CSE Department",
        category: "Department",
        year: 2023,
        description: "Recognized for introducing the 'Honours with Tech Entrepreneurship' curriculum.",
    },
    {
        id: 4,
        title: "Smart India Hackathon - 1st Runner Up",
        recipient: "Team CyberShield",
        category: "Hackathon",
        year: 2023,
        description: "Developed a blockchain-based land registry system. Lead: Kiran.",
    },
    {
        id: 5,
        title: "Google Solution Challenge - Top 50",
        recipient: "Team GreenTech",
        category: "Student",
        year: 2024,
        description: "IoT solution for sustainable urban farming. Mentored by Dinesh.",
    },
    {
        id: 6,
        title: "Best Student Startup",
        recipient: "CampusConnect",
        category: "Student",
        year: 2024,
        description: "Incubated startup providing hyper-local campus delivery services. Founder: Surya."
    }
];
