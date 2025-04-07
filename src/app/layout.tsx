import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import "./normalize.css";
import Nav from "@/components/Nav";
import { Providers } from "./providers";

const kanit = Kanit({
    weight: ["200", "300", "400", "500", "600", "700"],
    style: ["italic", "normal"],
    subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
    title: "Numa",
    description: "Numa es una app web en la que puedes gestionar tus finanzas personales.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
        <body className={kanit.className}>
            <Providers>
                <Nav />
                {children}
            </Providers>
        </body>
        </html>
    );
}
