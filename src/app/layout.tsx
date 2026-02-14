import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";
import { ChatWidget } from "@/components/chat/chat";
import { InteractiveGrid } from "@/components/ui/interactive-grid";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CSE-HTE Department | Innovate. Engineer. Entrepreneur.",
  description: "Official website of the Computer Science & Engineering - Honours with Tech Entrepreneurship department.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} antialiased`}>
        {/* Grid at strict 0 z-index */}
        <InteractiveGrid />

        {/* Content at strict positive z-index to stay above grid */}
        <div className="relative z-10 w-full min-h-screen">
          {children}
        </div>

        <ChatWidget />
      </body>
    </html>
  );
}
