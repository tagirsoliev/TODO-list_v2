"use client";
import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Task } from "../../types/types";

// Подписка на изменения localStorage: нативное событие "storage" приходит из
// других вкладок, синтетическое — мы шлём его сами при записи в этой вкладке.
function subscribe(callback: () => void) {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
}

export default function useLocalStorage(
    name: string,
    defValue: Task[],
): [Task[], React.Dispatch<React.SetStateAction<Task[]>>] {
    // getServerSnapshot возвращает null → на сервере рендерим defValue.
    // На клиенте useSyncExternalStore сначала повторяет серверное значение
    // (без ошибки гидратации), затем переключается на реальное из localStorage.
    const stored = useSyncExternalStore(
        subscribe,
        () => localStorage.getItem(name),
        () => null,
    );

    const list = useMemo<Task[]>(() => {
        if (!stored) return defValue;
        try {
            return JSON.parse(stored) as Task[];
        } catch {
            // повреждённые данные в хранилище — откатываемся к defValue
            return defValue;
        }
        // defValue — константа по умолчанию, значимо только stored
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stored]);

    const setList = useCallback<React.Dispatch<React.SetStateAction<Task[]>>>(
        (action) => {
            // Читаем актуальное значение из хранилища, чтобы поддержать
            // функциональные апдейты вида setTasks(prev => ...).
            let current: Task[] = defValue;
            try {
                const raw = localStorage.getItem(name);
                if (raw) current = JSON.parse(raw) as Task[];
            } catch {
                // игнорируем повреждённые данные
            }
            const next =
                typeof action === "function"
                    ? (action as (prev: Task[]) => Task[])(current)
                    : action;
            localStorage.setItem(name, JSON.stringify(next));

            window.dispatchEvent(new StorageEvent("storage", { key: name }));
        },
        // defValue — константа по умолчанию
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [name],
    );

    return [list, setList];
}
