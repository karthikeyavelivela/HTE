export interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
    type: "Upcoming" | "Past";
    image?: string;
}

export const eventsData: Event[] = [
    {
        id: 1,
        title: "Tech Founder Talks",
        date: "15 MAR 2026",
        time: "10:00 AM",
        location: "Main Auditorium",
        description: "Series of talks by successful alumni founders sharing their journey from dorm room to boardroom.",
        type: "Upcoming"
    },
    {
        id: 2,
        title: "Hackathon Kickoff",
        date: "22 MAR 2026",
        time: "09:00 AM",
        location: "Innovation Lab 1",
        description: "24-hour hackathon focused on AI solutions for social good. Teams of 4 allowed.",
        type: "Upcoming"
    },
    {
        id: 3,
        title: "Project Expo 2026",
        date: "05 APR 2026",
        time: "02:00 PM",
        location: "Exhibition Hall",
        description: "Showcase of final year projects and research prototypes.",
        type: "Upcoming"
    },
    {
        id: 4,
        title: "AI Workshop",
        date: "10 FEB 2026",
        time: "11:00 AM",
        location: "Lab 2",
        description: "Hands-on workshop on Generative Adversarial Networks.",
        type: "Past"
    },
    {
        id: 5,
        title: "Startup Pitch Day",
        date: "20 JAN 2026",
        time: "01:00 PM",
        location: "Incubation Center",
        description: "Selected teams pitched to angel investors.",
        type: "Past"
    }
];
