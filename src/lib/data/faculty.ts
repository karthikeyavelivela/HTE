export interface Faculty {
    id: string;
    name: string;
    role: string;
    specialization: string[];
    cabin: string;
    email: string;
    publications: number;
    image?: string;
    showOnHomepage?: boolean;
    currentClasses: { code: string; name: string; timings: string; isCourseCoordinator: boolean }[];
    availableTimings: { [key: string]: string[] };
    awards: { title: string; year: string; organization: string }[];
    researchAreas: string[];
}

export const facultyData: Faculty[] = [
    {
        id: "FAC001",
        name: "Dr. Karthikeya V.",
        role: "Head of Department",
        specialization: ["Artificial Intelligence", "Blockchain"],
        cabin: "H-101",
        email: "karthikeya.v@cse.hte.edu",
        publications: 45,
        showOnHomepage: true,
        currentClasses: [
            { code: "CS401", name: "Advanced AI", timings: "Mon 10:00-11:30", isCourseCoordinator: true },
            { code: "CS602", name: "Blockchain Architecture", timings: "Wed 14:00-15:30", isCourseCoordinator: false }
        ],
        availableTimings: {
            "Monday": ["11:30-12:30"],
            "Thursday": ["15:00-16:00"]
        },
        awards: [
            { title: "Best Researcher", year: "2024", organization: "Nat. Science Foundation" }
        ],
        researchAreas: ["Decentralized AI", "Smart Contracts"]
    },
    {
        id: "FAC002",
        name: "Prof. Nithya Menon",
        role: "Associate Professor",
        specialization: ["Data Science", "Machine Learning"],
        cabin: "H-104",
        email: "nithya.m@cse.hte.edu",
        publications: 28,
        showOnHomepage: true,
        currentClasses: [
            { code: "CS305", name: "Data Analytics", timings: "Tue 09:00-10:30", isCourseCoordinator: true }
        ],
        availableTimings: {
            "Tuesday": ["11:00-12:00"],
            "Friday": ["14:00-15:00"]
        },
        awards: [],
        researchAreas: ["Big Data", "Predictive Modeling"]
    },
    {
        id: "FAC003",
        name: "Dr. Ashwin Kumar",
        role: "Assistant Professor",
        specialization: ["Cyber Security", "Network Forensics"],
        cabin: "H-202",
        email: "ashwin.k@cse.hte.edu",
        publications: 15,
        showOnHomepage: true,
        currentClasses: [
            { code: "CS410", name: "Ethical Hacking", timings: "Thu 11:00-12:30", isCourseCoordinator: true }
        ],
        availableTimings: {
            "Wednesday": ["10:00-11:00"]
        },
        awards: [{ title: "Cyber Excellence", year: "2023", organization: "CyberForce" }],
        researchAreas: ["IoT Security", "Cryptography"]
    },
    {
        id: "FAC004",
        name: "Prof. Vennela Reddy",
        role: "Senior Lecturer",
        specialization: ["Cloud Computing", "DevOps"],
        cabin: "H-205",
        email: "vennela.r@cse.hte.edu",
        publications: 12,
        showOnHomepage: true,
        currentClasses: [],
        availableTimings: { "Friday": ["10:00-12:00"] },
        awards: [],
        researchAreas: ["Serverless Architecture"]
    },
    {
        id: "FAC005",
        name: "Dr. Surya Prakash",
        role: "Professor",
        specialization: ["Internet of Things", "Embedded Systems"],
        cabin: "H-108",
        email: "surya.p@cse.hte.edu",
        publications: 60,
        showOnHomepage: true,
        currentClasses: [
            { code: "CS501", name: "IoT Systems", timings: "Mon 14:00-15:30", isCourseCoordinator: true }
        ],
        availableTimings: { "Monday": ["16:00-17:00"] },
        awards: [{ title: "Innovator of the Year", year: "2022", organization: "TechIndia" }],
        researchAreas: ["Smart Cities", "Sensor Networks"]
    }
];
