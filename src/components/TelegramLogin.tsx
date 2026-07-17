"use client";
import useAuth from "@/app/hooks/useAuth";
import api from "@/lib/api/api";
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
                        scope?: string[];
                        lang?: string;
                        nonce?: string;
                    },
                    callback: (data: TelegramAuthResult) => void,
                ) => void;
            };
        };
    }
}

const SCRIPT_ID = "telegram-login-script";

export default function TelegramLogin() {
    const { setAuth } = useAuth();

    useEffect(() => {
        const handleAuth = (data: TelegramAuthResult) => {
            if (!data || data.error) {
                console.error("Ошибка входа:", data?.error);
                return;
            }

            api("/auth/telegram", "POST", undefined, { idToken: data.id_token })
                .then((result) =>
                    setAuth({ token: result.accessToken, user: result.user }),
                )
                .catch((err) => console.error(err));
        };

        // init навешивает стили на .tg-auth-button и включает обработку кликов.
        // Скоуп profile обязателен: без него в id_token не будет клейма id,
        // а бэкенд ищет пользователя в белом списке именно по нему.
        const initWidget = () => {
            window.Telegram?.Login.init(
                { client_id: CLIENT_ID, scope: ["profile", "write"] },
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
    }, [setAuth]);

    return (
        <button className="tg-auth-button" data-style="icon shine">
            Sign In with Telegram
        </button>
    );
}
