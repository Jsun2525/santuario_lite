import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const payload = await request.json();
        console.log("Skool Trigger Webhook Received:");
        console.log(`Email: ${payload.email} | Challenge: ${payload.challenge_id} | Name: ${payload.user_name}`);

        const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

        if (!N8N_WEBHOOK_URL) {
            console.warn("N8N_WEBHOOK_URL is not set. Webhook simulated with payload: ", payload);
            return NextResponse.json({ success: true, simulated: true, payload });
        }

        // Call N8N webhook
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`n8n webhook failed: ${response.statusText}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
