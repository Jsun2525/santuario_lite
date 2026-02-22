"use client";

import { useState, useEffect } from "react";

export interface MockUser {
    id: string;
    email: string;
    name: string;
}

export function useAuth() {
    const [user, setUser] = useState<MockUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            // MVP: Simulate local storage user session or auto-login guest
            const stored = localStorage.getItem("inner_path_user");
            if (stored) {
                setUser(JSON.parse(stored));
            } else {
                const guestUser = { id: "guest-" + Date.now(), email: "guest@innerpath.app", name: "Viajero" };
                localStorage.setItem("inner_path_user", JSON.stringify(guestUser));
                setUser(guestUser);
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const signIn = async (email: string, pass: string): Promise<{ error: Error | null }> => {
        // Simulate network
        await new Promise(r => setTimeout(r, 600));
        const user = { id: "local-" + Date.now(), email, name: email.split("@")[0] };
        localStorage.setItem("inner_path_user", JSON.stringify(user));
        setUser(user);
        return { error: null };
    };

    const signOut = async () => {
        localStorage.removeItem("inner_path_user");
        setUser(null);
        return { error: null };
    };

    return { user, loading, signIn, signOut };
}
