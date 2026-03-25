"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "./useAuth";

export interface OracleQuote {
  id: string;
  text: string;
  author: string;
  category: string;
}

export function useOracle() {
  const { user } = useAuth();
  const [quote, setQuote] = useState<OracleQuote | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [togglingFav, setTogglingFav] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadDailyQuote = async () => {
      setLoading(true);

      // Check if user already has a quote for today
      const today = new Date().toISOString().split("T")[0];
      const { data: existing } = await supabase
        .from("user_oracle_history")
        .select("quote_id, oracle_quotes(*)")
        .eq("user_id", user.id)
        .eq("viewed_date", today)
        .single();

      if (existing?.oracle_quotes) {
        const q = existing.oracle_quotes as unknown as OracleQuote;
        setQuote(q);
        await checkFavorite(user.id, q.id);
        setLoading(false);
        return;
      }

      // Get IDs the user has already seen
      const { data: history } = await supabase
        .from("user_oracle_history")
        .select("quote_id")
        .eq("user_id", user.id);

      const seenIds = (history || []).map((h) => h.quote_id);

      // Fetch all quotes
      const { data: allQuotes } = await supabase
        .from("oracle_quotes")
        .select("*");

      if (!allQuotes || allQuotes.length === 0) {
        setLoading(false);
        return;
      }

      // Filter unseen; if all seen, reset cycle
      let pool = allQuotes.filter((q) => !seenIds.includes(q.id));
      if (pool.length === 0) {
        // Clear history to start fresh cycle
        await supabase
          .from("user_oracle_history")
          .delete()
          .eq("user_id", user.id);
        pool = allQuotes;
      }

      // Pick random quote from pool
      const picked = pool[Math.floor(Math.random() * pool.length)];

      // Save to history
      await supabase.from("user_oracle_history").insert({
        user_id: user.id,
        quote_id: picked.id,
        viewed_date: today,
      });

      setQuote(picked);
      await checkFavorite(user.id, picked.id);
      setLoading(false);
    };

    const checkFavorite = async (userId: string, quoteId: string) => {
      const { count } = await supabase
        .from("user_oracle_favorites")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("quote_id", quoteId);
      setIsFavorite((count || 0) > 0);
    };

    loadDailyQuote();
  }, [user]);

  const toggleFavorite = useCallback(async () => {
    if (!user || !quote || togglingFav) return;
    setTogglingFav(true);

    if (isFavorite) {
      await supabase
        .from("user_oracle_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("quote_id", quote.id);
      setIsFavorite(false);
    } else {
      await supabase.from("user_oracle_favorites").insert({
        user_id: user.id,
        quote_id: quote.id,
      });
      setIsFavorite(true);
    }

    setTogglingFav(false);
  }, [user, quote, isFavorite, togglingFav]);

  return { quote, loading, isFavorite, toggleFavorite, togglingFav };
}
