import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function BibliotecaPage() {
    return (
        <div className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen bg-[radial-gradient(at_0%_0%,rgba(125,48,248,0.15)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(125,48,248,0.1)_0px,transparent_50%)] selection:bg-primary/30">
            <header className="sticky top-0 z-50 px-6 pt-12 pb-6 bg-[#0f0a19]/80 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-primary/60">Biblioteca</h1>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Santuario de Bienestar</p>
                    </div>
                    <div className="size-10 rounded-full glass flex items-center justify-center border-primary/20">
                        <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
                    </div>
                </div>

                <div className="relative group">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                    </div>
                    <input
                        className="w-full bg-white/5 border border-white/10 rounded-full py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-primary/40 focus:border-primary/50 focus:bg-white/10 transition-all placeholder:text-slate-500 text-sm outline-none"
                        placeholder="Buscar meditación o guía..."
                        type="text"
                    />
                </div>

                <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                    <button className="px-5 py-2 rounded-full bg-primary text-white text-xs font-semibold whitespace-nowrap shadow-lg shadow-primary/20">Todo</button>
                    <button className="px-5 py-2 rounded-full glass text-slate-300 text-xs font-medium whitespace-nowrap hover:bg-white/10 transition-colors">Iniciación</button>
                    <button className="px-5 py-2 rounded-full glass text-slate-300 text-xs font-medium whitespace-nowrap hover:bg-white/10 transition-colors">Cuerpo de Luz</button>
                    <button className="px-5 py-2 rounded-full glass text-slate-300 text-xs font-medium whitespace-nowrap hover:bg-white/10 transition-colors">Silencio</button>
                </div>
            </header>

            <main className="px-6 pb-32">
                <section className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Iniciación</h2>
                        <button className="text-primary text-xs font-semibold">Ver todos</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/sonidos" className="relative group rounded-xl overflow-hidden aspect-[4/5] glass border-white/5 block">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJqLs9z5zXZCj8A2dfQBSZIBZ0AfABTfUeILZ8zZwT2PaVH9zxV1Wak17U4so7T7GrM3bPB_PUsOqY-cEi1Heaha_QDVfChDiV5kUCsUGHJUdW8aaspV_kAa5zzU04dgiyc6lR3mBVkAs0BmI6RW2jh27O_dLaTkHai_QAVgtTYx2CigXK7mKj5TZ8HnGfDec-EwHa-we_t0tSQY4bKRbsHDhr9dUDq4eb-_iXtVWXvr2jYXfqLIZnT4F9Ijs4A5mOk7Qj_oX9wWXH" alt="Respiración" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 backdrop-blur-md border rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border-primary/30">10 min</div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Nivel 1</p>
                                <h3 className="text-sm font-bold leading-tight">Respiración Consciente</h3>
                            </div>
                        </Link>
                        <Link href="/sonidos" className="relative group rounded-xl overflow-hidden aspect-[4/5] glass border-white/5 block">
                            <img className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQTMT7rIdZGrnJb_LBZdE7_E3wJV6z-9-tOhJiANlG2ijLSPzQ5aHYCutKRw0v8dUylWgEffUNa26VLsGWXh-w0-k4gbp2Wm9QYPxKdH_h3XO7OyqQcqooS66W0CQDK4csSvbuiQMfQGA3f6OnLqJ2aB7cJ_O7JeVOsxnDDqyC07BeQbr2jkKOVMEKAN4J4NquJXAp-o6SiF8sHPkkHtxLzxgJZT8PKBKWHSKC9oBJQoWHINl-KCtbCL2bFUhfGHtS45pDZSkeZfhj" alt="Presencia" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 backdrop-blur-md border rounded-full text-[10px] font-bold text-white uppercase tracking-tighter border-primary/30">15 min</div>
                            <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Guía</p>
                                <h3 className="text-sm font-bold leading-tight">Presencia en el Ahora</h3>
                            </div>
                        </Link>
                    </div>
                </section>

                <section className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Cuerpo de Luz</h2>
                        <button className="text-primary text-xs font-semibold">Explorar</button>
                    </div>
                    <Link href="/sonidos" className="relative block rounded-xl overflow-hidden h-48 glass border-primary/20 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent z-10"></div>
                        <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBt81yXdVlDXcTs-lQH7CViFa9wdcPG314d9zMhliXVPYwXxTUNk4pFQAMqVkbLs1HSTgSPK7ad1D49MlaHfxn75JS_tGZ3LzmDapmxkJdTvwGnPQUEblrlGEGDC_OKPEBWzaQBN7yOWJ1PYSwGtUBA6BHsq1EgTvfcUxa7Lo6WjM1zTt2kB0lD1traap8UoUyXxn_O9mYPesg9MjDKK0mWGIP4-olurBZqwLVSXoz3JVQlbpKnQwG8OsM-syWBsWHY8tjokG2xW5MN" alt="Chakras" />
                        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center">
                            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-bold text-white uppercase tracking-widest w-fit mb-3">Avanzado</span>
                            <h3 className="text-xl font-extrabold mb-2">Activación de Chakras</h3>
                            <p className="text-xs text-white/70 max-w-[180px] leading-relaxed">Sintoniza tu frecuencia vibratoria a través del color y sonido.</p>
                        </div>
                        <div className="absolute right-6 bottom-6 z-30">
                            <div className="size-12 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50">
                                <span className="material-symbols-outlined text-white fill-1">play_arrow</span>
                            </div>
                        </div>
                    </Link>
                </section>

                <section className="mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold">Silencio Interior</h2>
                    </div>
                    <div className="space-y-4">
                        <Link href="/sonidos" className="flex items-center p-3 glass rounded-xl border-white/5 hover:bg-white/5 transition-colors">
                            <div className="size-14 rounded-lg overflow-hidden shrink-0">
                                <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA94bWIIRUnDpsY31afssg52wa9EmwOIP2Mcy0-dYm1LkTJdMPs66Uft01d7L4Qq8EQNwzzQk-9gq81VVWdKD9ZpnUh7tqSZ3wQFlvSx3wef2oW0LLGy6rgOl2NFBpSu67bD9K_RMzAdSFSPX6EdOpN7jtUNPUJ1gGYxcnmqjUdpLGdW_XyATZgKH7FioFTTi77bxJrjN38hS7MBfW_MnJZqVyPUZa6ijoOJ3wsoZYU3go4iG2wQWnulXQUqk8-ZjeP0BAhBq1Wd_Fq" alt="Vacío" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h4 className="text-sm font-bold">Vacío Absoluto</h4>
                                <p className="text-xs text-slate-400">Zen • 30 min</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-500">more_vert</span>
                        </Link>
                        <Link href="/sonidos" className="flex items-center p-3 glass rounded-xl border-white/5 hover:bg-white/5 transition-colors">
                            <div className="size-14 rounded-lg overflow-hidden shrink-0">
                                <img className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB80eK-bNcrS1zSqZ4NwsHGSaArXpRl1-srstxM09Dvl8PuHMyxGkNmZhAy_p8RHdV5SPdcHOkzE2RzwW53EvgB-gqG5tJJ-H7tm6oHk8tk3GHCAH9zpPWIFE6bHTTR2V1Alp51Y45XUM5dKk7Rj5UWEauQU8v0FZrYDAxvZkt_YHQJNpTp1sjDi-Ki_-L-haTxIm3ruN6OB6pFU8IIkDEnii3hYw9Cba6ud4bU2LYe4kfq6cIIt9IzBWngeVBLkTuODuFPztKGS979" alt="Principiante" />
                            </div>
                            <div className="ml-4 flex-1">
                                <h4 className="text-sm font-bold">Mente de Principiante</h4>
                                <p className="text-xs text-slate-400">Vipassana • 20 min</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-500">more_vert</span>
                        </Link>
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
}
