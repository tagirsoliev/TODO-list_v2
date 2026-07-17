"use client";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../types/types";
import TaskForm from "@/components/TaskForm";
import TasksList from "@/components/TasksList";
import Loader from "@/components/Loader";
import ErrorAlert from "@/components/ErrorAlert";
import api from "@/lib/api/api";
import useAuth from "./hooks/useAuth";

export default function Home() {
    const [error, setError] = useState<string | null>(null);
    // null — ещё не загружали, [] — загрузили и пусто.
    const [tasks, setTasks] = useState<Task[] | null>(null);
    const { token, user } = useAuth();
    const isLoading = token !== null && tasks === null && error === null;


    const loadTasks = useCallback(() => {
        if (!token) return;
        api("/tasks", "GET", { Authorization: `Bearer ${token}` })
            .then((result) => {
                setError(null);
                setTasks(result);
            })
            .catch((err) => setError(err.message));
    }, [token]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const authHeader = { Authorization: `Bearer ${token}` };

    const addTask = (text: string) => {
        api("/tasks", "POST", authHeader, { text })
            .then(loadTasks)
            .catch((err) => setError(err.message));
    };

    // PATCH :id/done необратим, так что выполненная задача уходит насовсем.
    const completeTask = (id: number) => {
        api(`/tasks/${id}/done`, "PATCH", authHeader)
            .then(loadTasks)
            .catch((err) => setError(err.message));
    };

    const deleteTask = (id: number) => {
        api(`/tasks/${id}`, "DELETE", authHeader)
            .then(loadTasks)
            .catch((err) => setError(err.message));
    };

    if (!token || !user) {
        return (
            <p className="py-6 text-center text-sm text-foreground/60">
                Войдите через Telegram, чтобы увидеть свои задачи.
            </p>
        );
    }

    return (
        <main className="flex flex-col gap-6">
            {error && (
                <ErrorAlert message={error} onClose={() => setError(null)} />
            )}

            <TaskForm onAdd={addTask} />

            {isLoading ? (
                <Loader />
            ) : (
                <TasksList
                    tasks={tasks ?? []}
                    meId={user.telegramId}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                />
            )}
        </main>
    );
}
