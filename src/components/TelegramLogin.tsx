"use client";
import { CLIENT_ID } from "@/constants/constants";
import { useEffect } from "react";

// Данные, которые Telegram передаёт в колбэк после входа (scope: openid profile).
type TelegramAuthResult = {
    id_token?: string;
    error?: string;
};

// Виджет создаёт window.Telegram.Login после загрузки скрипта.
declare global {
    interface Window {
        Telegram?: {
            Login: {
                init: (
                    options: {
                        client_id: number | string;
                        request_access?: string | string[];
                        lang?: string;
                    },
                    callback: (data: TelegramAuthResult) => void,
                ) => void;
            };
        };
    }
}

const SCRIPT_ID = "telegram-login-script";

export default function TelegramLogin() {
    useEffect(() => {
        const handleAuth = (data: TelegramAuthResult) => {
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
        };

        // init навешивает стили на .tg-auth-button и включает обработку кликов.
        const initWidget = () => {
            window.Telegram?.Login.init(
                { client_id: CLIENT_ID, request_access: "write" },
                handleAuth,
            );
        };

        // Скрипт уже был загружен ранее (напр. при повторном рендере) —
        // просто переинициализируем виджет с актуальным колбэком.
        if (window.Telegram?.Login) {
            initWidget();
            return;
        }

        const existing = document.getElementById(
            SCRIPT_ID,
        ) as HTMLScriptElement | null;
        if (existing) {
            existing.addEventListener("load", initWidget);
            return () => existing.removeEventListener("load", initWidget);
        }

        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://oauth.telegram.org/js/telegram-login.js?5";
        script.async = true;
        script.onload = initWidget;
        document.body.appendChild(script);
    }, []);

    return (
        <button className="tg-auth-button" data-style="icon shine">
            Sign In with Telegram
        </button>
    );
}
