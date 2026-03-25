"use client";

import { useState, useCallback } from "react";
import { BottomNav } from "@/components/BottomNav";

const QUOTES = [
  {
    text: "El universo no está fuera de ti. Mira dentro de ti mismo; todo lo que deseas, ya lo eres.",
    author: "Rumi",
  },
  {
    text: "La paz viene de adentro. No la busques afuera.",
    author: "Buda",
  },
  {
    text: "No eres una gota en el océano. Eres el océano entero en una gota.",
    author: "Rumi",
  },
  {
    text: "El silencio es el lenguaje de Dios; todo lo demás es una mala traducción.",
    author: "Rumi",
  },
  {
    text: "Cuando cambias la forma en que miras las cosas, las cosas que miras cambian.",
    author: "Wayne Dyer",
  },
  {
    text: "Tu tarea no es buscar el amor, sino buscar y encontrar todas las barreras dentro de ti que has construido contra él.",
    author: "Rumi",
  },
  {
    text: "Lo que niegas te somete. Lo que aceptas te transforma.",
    author: "Carl Jung",
  },
  {
    text: "El alma siempre sabe qué hacer para sanarse. El reto es silenciar la mente.",
    author: "Caroline Myss",
  },
];

function getRandomIndex(excludeIndex: number): number {
  let next: number;
  do {
    next = Math.floor(Math.random() * QUOTES.length);
  } while (next === excludeIndex && QUOTES.length > 1);
  return next;
}

export default function OraculoPage() {
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length)
  );

  const quote = QUOTES[quoteIndex];

  const handleNewMessage = useCallback(() => {
    setQuoteIndex((prev) => getRandomIndex(prev));
  }, []);

  const handleShare = useCallback(async () => {
    const shareText = `"${quote.text}"\n— ${quote.author}`;

    if (navigator.share) {
      try {
        await navigator.share({ text: shareText });
      } catch {
        // User cancelled or share failed silently
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Mensaje copiado al portapapeles");
      } catch {
        // Clipboard not available
      }
    }
  }, [quote]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0904]">
      {/* Golden radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(249, 189, 36, 0.15) 0%, rgba(10, 9, 4, 1) 70%)",
        }}
      />

      {/* Sparkle icon top center */}
      <div className="relative z-10 flex items-center justify-center p-6 pt-14">
        <span className="material-symbols-outlined text-3xl text-[#f9bd24]">
          auto_awesome
        </span>
      </div>

      {/* Quote centered */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
        <h1 className="font-serif italic text-[#f9bd24] tracking-tight text-3xl leading-relaxed mb-6">
          &ldquo;{quote.text}&rdquo;
        </h1>
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-[#f9bd24]/30" />
          <p className="text-[#f9bd24]/80 text-sm font-bold tracking-widest uppercase">
            — {quote.author}
          </p>
          <div className="h-px w-8 bg-[#f9bd24]/30" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative z-10 pb-28 px-6 mt-4">
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          <button
            onClick={handleNewMessage}
            className="h-14 rounded-xl border-2 border-[#f9bd24]/40 bg-transparent text-[#f9bd24] font-bold tracking-wide active:scale-95 transition-transform"
          >
            Nuevo mensaje
          </button>
          <button
            onClick={handleShare}
            className="h-14 rounded-xl bg-[#f9bd24] text-[#0a0904] font-bold tracking-wide shadow-lg shadow-[#f9bd24]/20 active:scale-95 transition-transform"
          >
            Compartir
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
