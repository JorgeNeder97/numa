import "./globals.css";
import "./normalize.css";
import Nav from "@/components/Nav";
import type { Metadata } from "next";
import { Providers } from "./providers";
import FooterClient from "@/components/FooterClient";

export const metadata: Metadata = {
    title: "Numa",
    description:
        "Numa es una app web en la que puedes gestionar tus finanzas personales.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body className="font-kanit">
                <Providers>
                    <Nav />
                    {children}
                    <FooterClient />
                </Providers>
            </body>
        </html>
    );
}
