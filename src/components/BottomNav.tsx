"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-8 pt-2">
            <div className="max-w-md mx-auto glass shimmer-effect iridescent-border rounded-2xl px-2 py-3 flex justify-around items-center shadow-2xl">
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-1/5 transition-colors ${pathname === '/' ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined !text-[28px] ${pathname === '/' ? 'fill-[1]' : ''}`}>home</span>
                    <span className="text-[9px] font-bold mt-1 uppercase tracking-tighter">Inicio</span>
                </Link>
                <Link
                    href="/japamala"
                    className={`flex flex-col items-center justify-center w-1/5 transition-colors ${pathname === '/japamala' ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined !text-[28px] ${pathname === '/japamala' ? 'fill-[1]' : ''}`}>self_improvement</span>
                    <span className="text-[9px] font-medium mt-1 uppercase tracking-tighter">Práctica</span>
                </Link>
                <Link
                    href="/diario"
                    className={`flex flex-col items-center justify-center w-1/5 transition-colors ${pathname === '/diario' ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined !text-[28px] ${pathname === '/diario' ? 'fill-[1]' : ''}`}>auto_awesome</span>
                    <span className="text-[9px] font-medium mt-1 uppercase tracking-tighter">Revelaciones</span>
                </Link>
                <Link
                    href="/tu-camino"
                    className={`flex flex-col items-center justify-center w-1/5 transition-colors ${pathname === '/tu-camino' ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined !text-[28px] ${pathname === '/tu-camino' ? 'fill-[1]' : ''}`}>route</span>
                    <span className="text-[9px] font-medium mt-1 uppercase tracking-tighter">Tu Camino</span>
                </Link>
                <Link
                    href="/perfil"
                    className={`flex flex-col items-center justify-center w-1/5 transition-colors ${pathname === '/perfil' ? 'text-primary' : 'text-slate-400'}`}
                >
                    <span className={`material-symbols-outlined !text-[28px] ${pathname === '/perfil' ? 'fill-[1]' : ''}`}>account_circle</span>
                    <span className="text-[9px] font-medium mt-1 uppercase tracking-tighter">Perfil</span>
                </Link>
            </div>
        </nav>
    );
}
