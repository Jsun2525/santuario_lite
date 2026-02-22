import Image from "next/image";

const GUYS = [
    {
        name: "Samantha",
        role: "Guía de Gratitud y Energía",
        bio: "Te acompaña en el camino a elevar tu vibración mediante el poder transformador de dar gracias.",
        image: "/images/team/guia1.webp",
        color: "from-primary/20 to-transparent",
    },
    {
        name: "Pablo",
        role: "Guía de Japa Mala y Meditación",
        bio: "Centrado en el control mental, Pablo te ayudará a volver la mirada hacia adentro.",
        image: "/images/team/guia2.webp",
        color: "from-accent/20 to-transparent",
    }
];

export default function TeamSection() {
    return (
        <div className="flex flex-col items-center min-h-screen p-6 py-24 space-y-16 w-full max-w-5xl mx-auto">
            <header className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-heading text-white tracking-wide">
                    Nuestro Equipo
                </h1>
                <p className="font-body text-lg text-white/70 max-w-2xl mx-auto">
                    Conoce a los guías que te acompañarán en este Santuario de Bienestar, ayudándote a integrar tu práctica diaria a tu estilo de vida.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                {GUYS.map((guia, idx) => (
                    <div key={idx} className="glass-card flex flex-col overflow-hidden group">
                        {/* Image Placeholder */}
                        <div className={`w-full h-80 bg-gradient-to-t ${guia.color} relative overflow-hidden flex items-center justify-center`}>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10" />
                            <div className="w-full h-full object-cover">
                                {/* Fallback to generic image styling if none exist */}
                                <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center text-white/20 select-none flex-col">
                                    <span className="text-4xl">🪴</span>
                                    <span className="text-xs pt-4 tracking-widest uppercase">{guia.image}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="p-8 space-y-4 z-20">
                            <div>
                                <h3 className="text-3xl font-heading text-white">{guia.name}</h3>
                                <p className="text-accent font-accent italic">{guia.role}</p>
                            </div>
                            <p className="text-white/60 font-body leading-relaxed">
                                {guia.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
