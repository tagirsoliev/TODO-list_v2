"use client";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/types";
import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";
import Loader from "@/components/Loader";
import ErrorAlert from "@/components/ErrorAlert";
import { getTasks, createTask, completeTask } from "@/lib/api/tasks";
import { toast } from "@heroui/react";
import useAuth from "./hooks/useAuth";

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    // null — ещё не загружали, [] — загрузили и пусто.
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const { token, user, users, authError, setAuthError } = useAuth();
    const isLoading = token !== null && tasks === null && error === null;

    const loadTasks = useCallback(() => {
        if (!token) return;
        getTasks(token)
            .then((result) => {
                setError(null);
                setTasks(result);
            })
            .catch((err) => setError(err.message));
    }, [token]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // Общий каркас мутации: сбросить ошибку → запрос → перечитать список.
    // Возвращает true при успехе — вызывающий чистит форму/снимает блокировку.
    const run = (action: (t: string) => Promise<unknown>): Promise<boolean> => {
        if (!token) return Promise.resolve(false);
        setError(null);
        return action(token)
            .then(() => {
                loadTasks();
                return true;
            })
            .catch((err) => {
                setError(err.message);
                return false;
            });
    };

    const addTask = (text: string, ownerTelegramId?: number) =>
        run((t) =>
            createTask(t, text, ownerTelegramId).then(() => {
                if (ownerTelegramId) {
                    const name =
                        users.find((u) => u.telegramId === ownerTelegramId)
                            ?.name ?? "получателю";
                    toast.success(`Назначено: ${name}`);
                }
            }),
        );
    const markDone = (id: number) => run((t) => completeTask(t, id));

    if (!token || !user) {
        return (
            <main className="flex flex-col gap-6">
                {authError && (
                    <ErrorAlert
                        message={authError}
                        onClose={() => setAuthError(null)}
                    />
                )}

                <p className="py-6 text-center text-sm text-foreground/60">
                    Войдите через Telegram, чтобы увидеть свои задачи.
                </p>
            </main>
        );
    }

    return (
        <main className="flex flex-col gap-6">
            {error && (
                <ErrorAlert message={error} onClose={() => setError(null)} />
            )}

            <TaskForm users={users} meId={user.telegramId} onAdd={addTask} />

            {isLoading ? (
                <Loader />
            ) : (
                <TasksList
                    tasks={tasks ?? []}
                    users={users}
                    meId={user.telegramId}
                    completeTask={markDone}
                />
            )}
        </main>
    );
}
