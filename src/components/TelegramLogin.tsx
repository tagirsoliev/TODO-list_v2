"use client";
import { CLIENT_ID } from "@/constants/constants";
import { useEffect } from "react";

// Данные, которые Telegram отдаёт в колбэк после входа
type TelegramAuthResult = {
    id_token?: string;
    user?: {
        id: number;
        name?: string;
        preferred_username?: string;
        picture?: string;
    };
    error?: string;
};

type TelegramLoginOptions = {
    client_id: number;
    scope?: Array<"profile" | "phone" | "write">;
    lang?: string;
    nonce?: string;
};

// Сообщаем TypeScript, что после загрузки скрипта в window появится Telegram
declare global {
    interface Window {
        Telegram: {
            Login: {
                auth: (
                    options: TelegramLoginOptions,
                    callback: (data: TelegramAuthResult) => void,
                ) => void;
            };
        };
    }
}

export default function TelegramLogin() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://oauth.telegram.org/js/telegram-login.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleLogin = () => {
        if (!window.Telegram?.Login) {
            console.error("Telegram-скрипт ещё не загрузился, попробуйте снова");
            return;
        }

        window.Telegram.Login.auth(
            { client_id: CLIENT_ID, scope: ["profile"] },
            (data) => {
                if (!data || data.error) {
                    console.error("Ошибка входа:", data?.error);
                    return;
                }

                fetch(
                    "https://todo-backend-sigma-five.vercel.app/api/auth/telegram",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ idToken: data.id_token }),
                    },
                )
                    .then((res) => res.json())
                    .then((result) => console.log("Ответ бэка:", result))
                    .catch((err) => console.error(err));
            },
        );
    };

    return <button onClick={handleLogin}>Sign In with Telegram</button>;
}
