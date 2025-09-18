"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function HeaderWrapper() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const hideHeaderOn = ["/", "/login"];
    if (hideHeaderOn.includes(pathname)) return null;

    return <Header />;
}
