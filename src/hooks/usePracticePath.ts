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
            .select('id, order_index, title, description, type, skool_course_id, skool_module_id')
            .order('order_index', { ascending: true });

        if (configError) {
            console.error("Error fetching path config:", configError);
            return;
        }

        // 2. Fetch user progress
        const { data: userProgress, error: progressError } = await supabase
            .from('user_path_progress')
            .select('step_id, status')
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

        // 5. Subscribe to Realtime changes for this user's progress
        if (!user) return;

        const channel = supabase
            .channel(`user_progress_${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'user_path_progress',
                    filter: `user_id=eq.${user.id}`
                },
                () => {
                    // Update local state when progress changes in DB (triggered by n8n/Skool webhook)
                    fetchPath();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user, fetchPath]);

    const completeStep = async (stepId: string) => {
        // This function is now mostly used to trigger ACTIONable steps from the APP
        // For 'practice' steps, it can still be used to mark local completion if desired
        // but the main 'class' completion comes from Skool now.
        if (!user) return { success: false };

        // For non-Skool linked steps (e.g. manual practices in app)
        const { error } = await supabase
            .from('user_path_progress')
            .upsert({
                user_id: user.id,
                step_id: stepId,
                status: 'completed',
                completed_at: new Date().toISOString()
            }, { onConflict: 'user_id,step_id' });

        if (error) return { success: false };

        fetchPath();
        return { success: true };
    };

    return { steps, loading, completeStep, refresh: fetchPath };
}
