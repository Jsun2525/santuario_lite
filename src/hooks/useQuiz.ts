"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export interface QuizOption {
  title: string;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "¿Qué buscas en tu práctica espiritual?",
    options: [
      { title: "Conexión profunda", description: "Sincroniza con los ritmos del cosmos" },
      { title: "Paz interior", description: "Libera la tensión y encuentra calma" },
      { title: "Claridad espiritual", description: "Encuentra el camino hacia tu verdad" },
    ],
  },
  {
    question: "¿Cuándo prefieres meditar?",
    options: [
      { title: "Al amanecer", description: "La energía del nuevo día me inspira" },
      { title: "Al atardecer", description: "El silencio de la noche me centra" },
      { title: "En cualquier momento", description: "Fluyo con el presente" },
    ],
  },
  {
    question: "¿Qué elemento natural te atrae más?",
    options: [
      { title: "Agua", description: "Fluidez y adaptación" },
      { title: "Fuego", description: "Transformación y pasión" },
      { title: "Aire", description: "Libertad y expansión" },
      { title: "Tierra", description: "Estabilidad y arraigo" },
    ],
  },
  {
    question: "¿Cómo manejas el estrés?",
    options: [
      { title: "Respiro profundamente", description: "Busco mi centro" },
      { title: "Camino en la naturaleza", description: "Me reconecto" },
      { title: "Escribo mis pensamientos", description: "Proceso internamente" },
    ],
  },
  {
    question: "¿Qué tipo de meditación te interesa?",
    options: [
      { title: "Meditación guiada", description: "Necesito una voz que me guíe" },
      { title: "Silencio total", description: "Prefiero el vacío" },
      { title: "Con música", description: "Los sonidos me transportan" },
    ],
  },
  {
    question: "¿Cuánto tiempo puedes dedicar a tu práctica?",
    options: [
      { title: "5-10 minutos", description: "Pasos pequeños pero constantes" },
      { title: "15-20 minutos", description: "Un espacio dedicado" },
      { title: "30+ minutos", description: "Inmersión profunda" },
    ],
  },
  {
    question: "¿Qué aspecto de tu vida quieres mejorar?",
    options: [
      { title: "Sueño y descanso", description: "Necesito paz nocturna" },
      { title: "Enfoque y productividad", description: "Quiero claridad mental" },
      { title: "Relaciones y empatía", description: "Busco conexión humana" },
    ],
  },
  {
    question: "¿Qué tan familiar estás con la meditación?",
    options: [
      { title: "Principiante", description: "Estoy comenzando" },
      { title: "Intermedio", description: "Practico ocasionalmente" },
      { title: "Avanzado", description: "Tengo una práctica regular" },
    ],
  },
  {
    question: "¿Qué te inspira más?",
    options: [
      { title: "La luna y las estrellas", description: "El cosmos me fascina" },
      { title: "Los bosques y montañas", description: "La tierra me llama" },
      { title: "El océano y los ríos", description: "El agua me calma" },
    ],
  },
  {
    question: "¿Cuál es tu intención principal?",
    options: [
      { title: "Sanar heridas emocionales", description: "" },
      { title: "Descubrir mi propósito", description: "" },
      { title: "Cultivar gratitud y alegría", description: "" },
    ],
  },
];

export function useQuiz() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(new Array(10).fill(null));

  const selectAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answer;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (currentIndex < 9) setCurrentIndex((i) => i + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const finish = async () => {
    if (!user) return;

    const elementMap: Record<string, string> = {
      Agua: "Agua",
      Fuego: "Fuego",
      Aire: "Aire",
      Tierra: "Tierra",
    };
    const element = elementMap[answers[2] || ""] || "Aire";

    await supabase
      .from("profiles")
      .update({
        nature_element: element,
        quiz_completed: true,
      })
      .eq("id", user.id);
  };

  const currentQuestion = QUESTIONS[currentIndex];
  const canProceed = answers[currentIndex] !== null;
  const isLast = currentIndex === 9;
  const progress = ((currentIndex + 1) / 10) * 100;

  return {
    currentIndex,
    currentQuestion,
    answers,
    selectAnswer,
    next,
    prev,
    finish,
    canProceed,
    isLast,
    progress,
  };
}
