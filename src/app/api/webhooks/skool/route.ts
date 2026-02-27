import { supabase } from "@/lib/supabase/client";

export default async function SkoolWebhook(req: Request) {
    if (req.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const body = await req.json();
        const { type, email, lesson_id, active, group_id } = body;

        // 1. Member Verification Flow (from PWA)
        if (type === "member_verification") {
            // This is called by the PWA to check if a user is in Skool
            // In a real scenario, n8n would be the one calling an external API
            // For now, we return a success if we want to mock it, or we expect n8n to handle this.
            return new Response(JSON.stringify({ active: true }), { status: 200 });
        }

        // 2. Skool Lesson Completion (from Skool -> n8n -> PWA)
        if (type === "lesson_completed" && lesson_id && email) {
            // Find user id by email
            const { data: profile } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", email)
                .single();

            if (profile) {
                // Find practice path step that matches this lesson id
                const { data: step } = await supabase
                    .from("practice_path_steps")
                    .select("id")
                    .eq("skool_lesson_id", lesson_id)
                    .single();

                if (step) {
                    // Update progress to completed
                    await supabase
                        .from("user_path_progress")
                        .update({ status: "completed", completed_at: new Date().toISOString() })
                        .match({ user_id: profile.id, step_id: step.id });

                    // The usePracticePath hook in the PWA will detect this update via Realtime
                    return new Response("OK", { status: 200 });
                }
            }
        }

        // 3. Subscription Update (from n8n cron or webhook)
        if (type === "subscription_update" && email) {
            await supabase
                .from("profiles")
                .update({ subscription_status: active ? "active" : "inactive" })
                .eq("email", email);

            return new Response("OK", { status: 200 });
        }

        return new Response("Event ignored", { status: 200 });
    } catch (error) {
        console.error("Webhook error:", error);
        return new Response("Error", { status: 500 });
    }
}
