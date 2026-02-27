"use client";

import React from "react";
import { PathStep } from "@/hooks/usePracticePath";

interface PracticePathProps {
    steps: PathStep[];
    onStepClick: (step: PathStep) => void;
}

export function PracticePath({ steps, onStepClick }: PracticePathProps) {
    return (
        <div className="flex flex-col items-center py-10 w-full max-w-md mx-auto relative">
            {/* SVG Path Background */}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none stroke-primary/20 fill-none" preserveAspectRatio="none">
                <path
                    d={generatePathD(steps.length)}
                    strokeWidth="4"
                    strokeDasharray="8 8"
                />
            </svg>

            {steps.map((step, index) => {
                const isEven = index % 2 === 0;
                const offset = index === 0 ? 0 : isEven ? -60 : 60;

                return (
                    <div
                        key={step.id}
                        className="relative mb-12 flex flex-col items-center"
                        style={{ transform: `translateX(${offset}px)` }}
                    >
                        {/* Node */}
                        <button
                            onClick={() => onStepClick(step)}
                            disabled={step.status === 'locked'}
                            className={`
                                w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 relative z-10
                                ${step.status === 'completed' ? 'bg-success shadow-[0_0_20px_rgba(46,204,113,0.5)]' :
                                    step.status === 'available' ? 'bg-primary shadow-[0_0_25px_rgba(123,47,247,0.6)] scale-110' :
                                        'bg-slate-800 opacity-50 grayscale cursor-not-allowed'}
                                hover:scale-105 active:scale-95
                            `}
                        >
                            <span className="material-symbols-outlined !text-[32px] text-white">
                                {step.status === 'completed' ? 'check' :
                                    step.type === 'class' ? 'school' : 'self_improvement'}
                            </span>

                            {/* Level Indicator */}
                            <div className="absolute -bottom-2 bg-background border border-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
                                STEP {index + 1}
                            </div>
                        </button>

                        {/* Label */}
                        <div className={`absolute top-1/2 -translate-y-1/2 w-40 ${isEven ? 'left-24 text-left' : 'right-24 text-right'}`}>
                            <h3 className={`text-sm font-bold ${step.status === 'locked' ? 'text-slate-500' : 'text-foreground'}`}>
                                {step.title}
                            </h3>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                                {step.type}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function generatePathD(count: number) {
    if (count <= 1) return "";
    let d = "M 50% 40";
    for (let i = 1; i < count; i++) {
        const isEven = i % 2 === 0;
        const x = 50 + (isEven ? -15 : 15);
        const y = 40 + (i * 120);
        d += ` L ${x}% ${y}`;
    }
    return d;
}
