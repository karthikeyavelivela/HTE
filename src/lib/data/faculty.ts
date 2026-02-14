export interface Faculty {
    id: string;
    name: string;
    role: string;
    specialization: string[];
    cabin: string;
    email: string;
    publications: number;
    showOnHomepage?: boolean;
    currentClasses: { code: string; name: string; timings: string; isCourseCoordinator: boolean }[];
    availableTimings: { [key: string]: string[] };
    awards: { title: string; year: string; organization: string }[];
    researchAreas: string[];
}

export const facultyData: Faculty[] = [
    {
        id: "FAC001",
        name: "Dr. Ashwin Kumar",
        role: "Head of Department, Deputy HOD & Professor",
        specialization: ["Cyber Security", "Network Forensics", "Artificial Intelligence"],
        cabin: "H-101",
        email: "ashwin.k@cse.hte.edu",
        publications: 45,
        showOnHomepage: true,
        currentClasses: [
            { code: "CS410", name: "Ethical Hacking", timings: "Thu 11:00-12:30", isCourseCoordinator: true },
            { code: "CS401", name: "Advanced AI", timings: "Mon 10:00-11:30", isCourseCoordinator: true }
        ],
        availableTimings: {
            "Monday": ["11:30-12:30"],
            "Wednesday": ["10:00-11:00"],
            "Thursday": ["15:00-16:00"]
        },
        awards: [
            { title: "Cyber Excellence", year: "2023", organization: "CyberForce" },
            { title: "Best Researcher", year: "2024", organization: "Nat. Science Foundation" }
        ],
        researchAreas: ["IoT Security", "Cryptography", "Decentralized AI"]
    }
];
