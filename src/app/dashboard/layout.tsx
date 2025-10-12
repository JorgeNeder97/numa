"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Aside from "@/components/Aside";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <Aside />
            <div key={pathname} className="min-h-[calc(100vh-80px-90px)] lg:min-h-[100vh] lg:ml-[300px]">
                {children}
            </div>
        </AnimatePresence>
    );
};
