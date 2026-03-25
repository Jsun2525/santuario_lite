"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export type Mood = "sad" | "neutral" | "happy" | "joyful" | "transcendent";
export type EnergyLevel = "Baja" | "Media" | "Alta";

export function useMoodCheckin() {
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel>("Media");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  useEffect(() => {
    const checkToday = async () => {
      if (!user) return;
      const today = new Date().toISOString().split("T")[0];
      try {
        const { count } = await supabase
          .from("mood_checkins")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .gte("created_at", `${today}T00:00:00`);
        if ((count || 0) === 0) setShowCheckin(true);
      } catch {
        // Table may not exist yet — show checkin anyway
        setShowCheckin(true);
      }
    };
    checkToday();
  }, [user]);

  const submit = async () => {
    if (!user || !selectedMood) return;
    setIsSubmitting(true);
    try {
      await supabase.from("mood_checkins").insert({
        user_id: user.id,
        mood: selectedMood,
        energy_level: energyLevel,
      });
    } catch {
      // Silent fail if table doesn't exist
    }
    setIsSubmitting(false);
    setShowCheckin(false);
  };

  const dismiss = () => setShowCheckin(false);

  return {
    selectedMood,
    setSelectedMood,
    energyLevel,
    setEnergyLevel,
    submit,
    isSubmitting,
    showCheckin,
    dismiss,
  };
}
