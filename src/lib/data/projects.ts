export interface Project {
    id: string;
    title: string;
    category: "Student" | "Faculty" | "Research";
    status: "Ongoing" | "Completed";
    description: string;
    team: string[];
    techStack: string[];
    image?: string;
    timeline: { date: string; milestone: string }[];
    links: { label: string; url: string }[];
}

export const projectsData: Project[] = [
    {
        id: "PROJ-001",
        title: "Neural Network Visualizer",
        category: "Student",
        status: "Completed",
        description: "An interactive 3D tool for visualizing neural network architecture and data flow in real-time, designed to help students understand deep learning concepts.",
        team: ["Sujith V.", "Kiran Rao"],
        techStack: ["React", "Three.js", "Python", "TensorFlow"],
        timeline: [
            { date: "Jan 2024", milestone: "Project Inception" },
            { date: "Mar 2024", milestone: "Prototype Demo" },
            { date: "May 2024", milestone: "Final Release" }
        ],
        links: [{ label: "GitHub", url: "#" }, { label: "Demo", url: "#" }]
    },
    {
        id: "PROJ-002",
        title: "Decentralized Voting System",
        category: "Student",
        status: "Ongoing",
        description: "Secure, transparent voting platform built on Ethereum blockchain to ensure tamper-proof elections for student council.",
        team: ["Dinesh Kumar", "Nithya M."],
        techStack: ["Solidity", "Ethereum", "Next.js"],
        timeline: [
            { date: "Aug 2024", milestone: "Smart Contract Dev" },
            { date: "Oct 2024", milestone: "Beta Testing" }
        ],
        links: [{ label: "Whitepaper", url: "#" }]
    },
    {
        id: "PROJ-003",
        title: "Smart Campus IoT Grid",
        category: "Faculty",
        status: "Ongoing",
        description: "Large-scale sensor network for monitoring energy usage and environmental quality across the university campus.",
        team: ["Dr. Surya Prakash", "Research Group Alpha"],
        techStack: ["IoT", "LoRaWAN", "AWS IoT", "Grafana"],
        timeline: [
            { date: "2023", milestone: "Phase 1 Deployment" },
            { date: "2024", milestone: "Data Analysis" }
        ],
        links: []
    },
    {
        id: "PROJ-004",
        title: "AI-Driven Crop Disease Detection",
        category: "Research",
        status: "Completed",
        description: "Mobile application using computer vision to detect plant diseases early and suggest treatments for farmers.",
        team: ["Prof. Vennela Reddy", "Grad Students"],
        techStack: ["Flutter", "TensorFlow Lite", "Firebase"],
        timeline: [
            { date: "Feb 2023", milestone: "Data Collection" },
            { date: "Nov 2023", milestone: "Field Trials" }
        ],
        links: [{ label: "Paper", url: "#" }]
    },
    {
        id: "PROJ-005",
        title: "Autonomous Drone Swarm",
        category: "Student",
        status: "Ongoing",
        description: "Coordinated flight control algorithms for swarm robotics in search and rescue missions.",
        team: ["Vishnu P.", "Ashwin K."],
        techStack: ["ROS", "C++", "Python"],
        timeline: [
            { date: "Sep 2024", milestone: "Simulation" }
        ],
        links: []
    }
];
