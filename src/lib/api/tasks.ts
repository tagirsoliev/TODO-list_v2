import api from "./api";
import type { Task, User } from "@/types/types";

const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

export const getTasks = (token: string): Promise<Task[]> =>
    api("/tasks", "GET", authHeader(token));

// ownerTelegramId опускаем, когда задача себе — иначе бэкенд проверяет
// получателя по белому списку. undefined в JSON.stringify всё равно отпадёт,
// но явный объект без ключа честнее.
export const createTask = (
    token: string,
    text: string,
    ownerTelegramId?: number,
): Promise<Task> =>
    api(
        "/tasks",
        "POST",
        authHeader(token),
        ownerTelegramId ? { text, ownerTelegramId } : { text },
    );

export const completeTask = (token: string, id: number): Promise<Task> =>
    api(`/tasks/${id}/done`, "PATCH", authHeader(token));

export const getUsers = (token: string): Promise<User[]> =>
    api("/users", "GET", authHeader(token));
