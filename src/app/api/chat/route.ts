import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { facultyData } from '@/lib/data/faculty';
import { projectsData } from '@/lib/data/projects';
import { eventsData } from '@/lib/data/events';
import { clubsData } from '@/lib/data/clubs';

// Initialize Anthropic client (will fail if key is missing, so we'll wrap in try-catch or conditional)
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
});

const SYSTEM_PROMPT = `
You are the AI Assistant for the CSE-HTE (Computer Science & Engineering - Honours with Tech Entrepreneurship) Department.
Your goal is to help visitors by providing information about Faculty, Projects, Events, and Clubs.

DATA CONTEXT:
FACULTY: ${JSON.stringify(facultyData.map(f => ({ name: f.name, role: f.role, cabin: f.cabin, email: f.email, timings: f.availableTimings })))}
PROJECTS: ${JSON.stringify(projectsData.map(p => ({ title: p.title, status: p.status, desc: p.description })))}
EVENTS: ${JSON.stringify(eventsData)}
CLUBS: ${JSON.stringify(clubsData.map(c => ({ name: c.name, lead: c.lead, meeting: c.meetingTime })))}

INSTRUCTIONS:
- Be concise and professional but with a technical/cyberpunk flair.
- Use uppercase for key terms occasionally.
- If you don't know something, advise contacting the department administration.
- Provide specific details (cabin numbers, times) when asked.
`;

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Check if we have a real API key
        if (!process.env.ANTHROPIC_API_KEY) {
            // Mock response for development
            return NextResponse.json({
                reply: `[MOCK MODE] SYSTEM SCAN COMPLETE. 
         I received your query: "${message}". 
         
         Since no valid API KEY is configured, I am running in simulation mode. 
         
         FACULTY CONTACT DETECTED: Dr. Sarah Chen (Cabin A-101).
         NEXT EVENT: Tech Founder Talks (15 MAR).`
            });
        }

        const response = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                { role: "user", content: message }
            ],
        });

        const reply = response.content[0].type === 'text' ? response.content[0].text : "Error generating response.";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ reply: "SYSTEM ERROR: UNABLE TO PROCESS REQUEST." }, { status: 500 });
    }
}
