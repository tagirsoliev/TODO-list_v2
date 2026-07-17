"use client";
import { Fragment, ReactNode } from "react";
import useAuth from "@/app/hooks/useAuth";

// Смена токена меняет key → React монтирует поддерево заново,
// поэтому состояние прошлой сессии сбрасывается само.
export default function SessionScope({ children }: { children: ReactNode }) {
    const { token } = useAuth();
    return <Fragment key={token ?? "anon"}>{children}</Fragment>;
}
