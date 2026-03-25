"use client";

import { useState, useCallback, useRef } from "react";
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
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const quote = QUOTES[quoteIndex];

  const handleNewMessage = useCallback(() => {
    setQuoteIndex((prev) => getRandomIndex(prev));
  }, []);

  const handleShareText = useCallback(async () => {
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

  const handleShareImage = useCallback(async () => {
    if (!cardRef.current || isGenerating) return;

    setIsGenerating(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;

      const canvas = await html2canvas(cardRef.current, {
        width: 1080,
        height: 1920,
        scale: 1,
        useCORS: true,
        backgroundColor: null,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        throw new Error("No se pudo generar la imagen");
      }

      const file = new File([blob], "santuario-quote.png", {
        type: "image/png",
      });

      // Try Web Share API with files
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        try {
          await navigator.share({
            files: [file],
          });
        } catch {
          // User cancelled — do nothing
        }
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "santuario-quote.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error generando imagen:", err);
    } finally {
      setIsGenerating(false);
    }
  }, [isGenerating]);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#0a0904]">
      {/* Hidden shareable card — rendered off-screen for html2canvas */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 1080,
          height: 1920,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div
          ref={cardRef}
          style={{
            width: 1080,
            height: 1920,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "120px 80px",
            background:
              "linear-gradient(180deg, #0a0904 0%, #1a160d 40%, #1a160d 60%, #0a0904 100%)",
            position: "relative",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {/* Radial golden glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              height: 800,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(249,189,36,0.12) 0%, rgba(249,189,36,0.04) 40%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Sparkle icon top */}
          <div
            style={{
              position: "absolute",
              top: 160,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 64,
              color: "#f9bd24",
              opacity: 0.6,
            }}
          >
            ✦
          </div>

          {/* Quote text */}
          <p
            style={{
              color: "#f9bd24",
              fontSize: 58,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: 1.5,
              textAlign: "center",
              margin: 0,
              position: "relative",
              zIndex: 1,
              maxWidth: 900,
            }}
          >
            «{quote.text}»
          </p>

          {/* Author */}
          <div
            style={{
              marginTop: 60,
              display: "flex",
              alignItems: "center",
              gap: 24,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: "rgba(249,189,36,0.3)",
              }}
            />
            <span
              style={{
                color: "rgba(249,189,36,0.8)",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              — {quote.author}
            </span>
            <div
              style={{
                width: 60,
                height: 1,
                backgroundColor: "rgba(249,189,36,0.3)",
              }}
            />
          </div>

          {/* Branding at bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 120,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 36, color: "#f9bd24", opacity: 0.5 }}>
              ✧
            </span>
            <span
              style={{
                color: "rgba(249,189,36,0.4)",
                fontSize: 22,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Santuario
            </span>
          </div>
        </div>
      </div>

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
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
          {/* Primary: Share as image for Stories */}
          <button
            onClick={handleShareImage}
            disabled={isGenerating}
            className="h-14 rounded-xl bg-[#f9bd24] text-[#0a0904] font-bold tracking-wide shadow-lg shadow-[#f9bd24]/20 active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <span className="material-symbols-outlined text-xl animate-spin">
                  progress_activity
                </span>
                Generando imagen…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-xl">
                  image
                </span>
                Compartir como imagen
              </>
            )}
          </button>

          {/* Secondary row: New message + text share */}
          <div className="flex gap-3">
            <button
              onClick={handleNewMessage}
              className="flex-1 h-12 rounded-xl border-2 border-[#f9bd24]/40 bg-transparent text-[#f9bd24] font-bold tracking-wide active:scale-95 transition-transform text-sm"
            >
              Nuevo mensaje
            </button>
            <button
              onClick={handleShareText}
              className="h-12 rounded-xl border-2 border-[#f9bd24]/40 bg-transparent text-[#f9bd24] font-bold tracking-wide active:scale-95 transition-transform px-5 flex items-center gap-1.5 text-sm"
            >
              <span className="material-symbols-outlined text-lg">
                share
              </span>
              Texto
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
