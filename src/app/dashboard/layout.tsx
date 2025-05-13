"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <div key={pathname} className="min-h-[calc(100vh-80px-90px)]">
                {children}
            </div>
        </AnimatePresence>
    );
};
