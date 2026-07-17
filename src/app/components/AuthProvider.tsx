"use client";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import type { Auth, User } from "@/types/types";
import { getUsers } from "@/lib/api/tasks";

export const AuthContext = createContext<{
    token: string | null;
    user: User | null;
    setAuth: (auth: Auth | null) => void;
    // Кнопка входа живёт в шапке, а показать ошибку надо на странице —
    // общего у них только этот контекст.
    authError: string | null;
    setAuthError: (message: string | null) => void;
    // Белый список для селекта «кому назначить». Грузим один раз при логине:
    // он маленький и почти не меняется.
    users: User[];
} | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    // Токен и юзер приходят одним ответом логина и живут одну жизнь.
    const [auth, setAuth] = useState<Auth | null>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!auth?.token) return;
        let ignore = false;
        getUsers(auth.token)
            .then((list) => {
                if (!ignore) setUsers(list);
            })
            .catch(() => {
                // Список — вспомогательный: если не загрузился, назначение
                // другому просто недоступно, вход и свои задачи не страдают.
            });
        return () => {
            ignore = true;
        };
    }, [auth?.token]);

    return (
        <AuthContext.Provider
            value={{
                token: auth?.token ?? null,
                user: auth?.user ?? null,
                setAuth,
                authError,
                setAuthError,
                users,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
