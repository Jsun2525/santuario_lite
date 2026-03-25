"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "@/hooks/useQuiz";

export default function QuizPage() {
  const router = useRouter();
  const {
    currentIndex,
    currentQuestion,
    answers,
    selectAnswer,
    next,
    finish,
    canProceed,
    isLast,
    progress,
  } = useQuiz();

  const handleNext = async () => {
    if (isLast) {
      await finish();
      router.push("/");
    } else {
      next();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0D0D1A] overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="pointer-events-none absolute top-20 -left-32 h-64 w-64 rounded-full bg-[#895af6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-40 -right-32 h-64 w-64 rounded-full bg-[#2DD4BF]/15 blur-[100px]" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-6 pb-4">
        <button
          onClick={() => router.push("/")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#151528] text-slate-400 transition hover:text-white"
          aria-label="Cerrar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <span className="text-sm font-bold uppercase tracking-widest text-[#895af6]">
          Perfil de Naturaleza
        </span>

        {/* Spacer for symmetry */}
        <div className="h-10 w-10" />
      </header>

      {/* Progress */}
      <div className="relative z-10 px-6 pb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#2DD4BF]">
            Paso {currentIndex + 1} de 10
          </span>
          <span className="text-sm text-slate-400">
            {Math.round(progress)}% completado
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-800">
          <div
            className="h-1.5 rounded-full bg-[#2DD4BF] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="relative z-10 px-6 pb-6">
        <h1
          className="text-4xl font-bold text-slate-100 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {currentQuestion.question}
        </h1>
      </div>

      {/* Options */}
      <div className="relative z-10 px-6 pb-32 space-y-3">
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentIndex] === option.title;
          return (
            <button
              key={option.title}
              onClick={() => selectAnswer(option.title)}
              className={`w-full flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "border-2 border-[#895af6] bg-[#151528] shadow-[0_0_20px_rgba(137,90,246,0.15)]"
                  : "border border-slate-800 bg-[#151528]"
              }`}
            >
              {/* Radio circle */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                  isSelected
                    ? "bg-[#895af6]"
                    : "border-2 border-slate-600"
                }`}
              >
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>

              {/* Text */}
              <div>
                <p className="text-lg font-bold text-white">{option.title}</p>
                {option.description && (
                  <p className="text-sm text-slate-400 mt-0.5">{option.description}</p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <div className="h-24 bg-gradient-to-t from-[#0D0D1A] to-transparent pointer-events-none" />
        <div className="bg-[#0D0D1A] px-6 pb-8">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className={`flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg font-bold text-white transition-all duration-200 ${
              canProceed
                ? "bg-[#895af6] hover:bg-[#7a4be0] active:scale-[0.98]"
                : "bg-[#895af6]/30 cursor-not-allowed"
            }`}
          >
            {isLast ? "Finalizar" : "Siguiente"}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
