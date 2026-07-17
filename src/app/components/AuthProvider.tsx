"use client";
import { ReactNode, useState } from "react";
import { createContext } from "react";
import type { Auth, User } from "@/types/types";

export const AuthContext = createContext<{
    token: string | null;
    user: User | null;
    setAuth: (auth: Auth | null) => void;
} | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    // Токен и юзер приходят одним ответом логина и живут одну жизнь.
    const [auth, setAuth] = useState<Auth | null>(null);

    return (
        <AuthContext.Provider
            value={{
                token: auth?.token ?? null,
                user: auth?.user ?? null,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
