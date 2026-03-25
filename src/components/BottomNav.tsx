"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
    { label: 'Inicio', icon: 'home', href: '/', exact: true },
    { label: 'Meditar', icon: 'bolt', href: '/meditacion-libre', exact: false, elevated: true },
    { label: 'Perfil', icon: 'person', href: '/perfil', exact: false },
];

export function BottomNav() {
    const pathname = usePathname();

    const isActive = (href: string, exact: boolean) => {
        if (exact) return pathname === href;
        return pathname === href || pathname.startsWith(href + '/');
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50">
            <div className="max-w-md mx-auto bg-[#0D0D1A]/90 backdrop-blur-lg border-t border-white/5 px-2 pt-2 pb-8 flex justify-around items-end">
                {tabs.map((tab) => {
                    const active = isActive(tab.href, !!tab.exact);

                    if (tab.elevated) {
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className="flex flex-col items-center justify-center w-1/3 -mt-6 transition-colors"
                            >
                                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/40 border-[3px] border-[#0D0D1A]">
                                    <span className="material-symbols-outlined !text-[28px] text-white fill-[1]">
                                        {tab.icon}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-medium tracking-wide mt-1 ${active ? 'text-[#854ef4]' : 'text-slate-500'}`}>
                                    {tab.label}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex flex-col items-center justify-center w-1/3 transition-colors ${active ? 'text-[#854ef4]' : 'text-slate-500'}`}
                        >
                            <span className={`material-symbols-outlined !text-[28px] ${active ? 'fill-[1]' : ''}`}>
                                {tab.icon}
                            </span>
                            <span className="text-[10px] font-medium tracking-wide mt-1">
                                {tab.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
