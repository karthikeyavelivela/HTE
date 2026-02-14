export interface Club {
    id: string;
    name: string;
    description: string;
    category: "Technical" | "Cultural" | "Social";
    members: number;
    lead: string;
    meetingTime: string;
    logoColor: string;
    activities: { date: string; title: string }[];
}

export const clubsData: Club[] = [
    {
        id: "CLUB-001",
        name: "AI & Robotics Club",
        description: "Building autonomous systems and exploring the frontiers of artificial intelligence.",
        category: "Technical",
        members: 120,
        lead: "Vishnu P.",
        meetingTime: "Wednesdays 5:00 PM @ Lab 1",
        logoColor: "#FF006E",
        activities: [
            { date: "Oct 2025", title: "Bot Wars Comp" },
            { date: "Nov 2025", title: "AI Ethics Workshop" }
        ]
    },
    {
        id: "CLUB-002",
        name: "Blockchain Society",
        description: "Decentralizing the future one block at a time.",
        category: "Technical",
        members: 85,
        lead: "Surya T.",
        meetingTime: "Thursdays 4:30 PM @ Sem Hall 2",
        logoColor: "#00F0FF",
        activities: [
            { date: "Sep 2025", title: "Crypto Trading Sim" }
        ]
    },
    {
        id: "CLUB-003",
        name: "CyberSec Cell",
        description: "Ethical hacking, CTFs, and network defense.",
        category: "Technical",
        members: 95,
        lead: "Ashwin K.",
        meetingTime: "Fridays 6:00 PM @ Lab 3",
        logoColor: "#00FF00",
        activities: [
            { date: "Monthly", title: "Capture The Flag" }
        ]
    },
    {
        id: "CLUB-004",
        name: "Developers Guild",
        description: "Full stack development community building real-world apps.",
        category: "Technical",
        members: 200,
        lead: "Nithya R.",
        meetingTime: "Saturdays 10:00 AM @ Innovation Hub",
        logoColor: "#FFE500",
        activities: []
    }
];
