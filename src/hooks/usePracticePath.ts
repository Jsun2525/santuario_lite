"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export interface PathStep {
    id: string;
    order_index: number;
    title: string;
    description: string | null;
    type: 'class' | 'practice';
    status: 'locked' | 'available' | 'completed';
    skool_course_id: string | null;
    skool_module_id: string | null;
}

export function usePracticePath() {
    const { user } = useAuth();
    const [steps, setSteps] = useState<PathStep[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPath = useCallback(async () => {
        if (!user) return;

        // 1. Fetch all steps configuration
        const { data: configSteps, error: configError } = await supabase
            .from('practice_path_steps')
            .select('*')
            .order('order_index', { ascending: true });

        if (configError) {
            console.error("Error fetching path config:", configError);
            return;
        }

        // 2. Fetch user progress
        const { data: userProgress, error: progressError } = await supabase
            .from('user_path_progress')
            .select('*')
            .eq('user_id', user.id);

        if (progressError) {
            console.error("Error fetching user progress:", progressError);
            return;
        }

        // 3. Merge config with user progress
        const mergedSteps: PathStep[] = configSteps.map((step) => {
            const progress = userProgress?.find((p) => p.step_id === step.id);
            return {
                ...step,
                status: progress?.status || (step.order_index === 1 ? 'available' : 'locked')
            };
        });

        // 4. If first time ever for this user, initialize the first step in DB
        if (userProgress.length === 0 && mergedSteps.length > 0) {
            const firstStep = mergedSteps[0];
            await supabase.from('user_path_progress').insert({
                user_id: user.id,
                step_id: firstStep.id,
                status: 'available'
            });
        }

        setSteps(mergedSteps);
        setLoading(false);
    }, [user]);

    useEffect(() => {
        fetchPath();
    }, [fetchPath]);

    const completeStep = async (stepId: string) => {
        if (!user) return { success: false };

        const currentStepIndex = steps.findIndex(s => s.id === stepId);
        if (currentStepIndex === -1) return { success: false };

        const currentStep = steps[currentStepIndex];
        const nextStep = steps[currentStepIndex + 1];

        const now = new Date();

        // 1. Mark current as completed
        const { error: updateError } = await supabase
            .from('user_path_progress')
            .upsert({
                user_id: user.id,
                step_id: stepId,
                status: 'completed',
                completed_at: now.toISOString(),
                updated_at: now.toISOString()
            }, { onConflict: 'user_id,step_id' });

        if (updateError) {
            console.error("Error updating current step:", updateError);
            return { success: false };
        }

        // 2. Mark NEXT as available if it exists
        if (nextStep) {
            await supabase
                .from('user_path_progress')
                .upsert({
                    user_id: user.id,
                    step_id: nextStep.id,
                    status: 'available',
                    updated_at: now.toISOString()
                }, { onConflict: 'user_id,step_id' });
        }

        // 3. Trigger Skool Webhook if applicable
        // Even if no skool_course_id is set in the DB yet, we send the event to n8n
        fetch("/api/webhooks/skool", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                event: "step_completed",
                step_title: currentStep.title,
                step_type: currentStep.type,
                skool_course_id: currentStep.skool_course_id,
                skool_module_id: currentStep.skool_module_id,
                user_name: user.user_metadata?.full_name || user.email
            })
        }).catch(e => console.warn("Skool webhook failed", e));

        // Refresh local state
        await fetchPath();
        return { success: true };
    };

    return { steps, loading, completeStep, refresh: fetchPath };
}
