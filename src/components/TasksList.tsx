import { useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import type { Task, User } from "@/types/types";

interface TasksListProps {
    tasks: Task[];
    users: User[];
    meId: number;
    completeTask: (id: number) => Promise<unknown>;
}

interface TaskItemProps {
    task: Task;
    authorName: string | null;
    completeTask: (id: number) => Promise<unknown>;
}

function TaskItem({ task, authorName, completeTask }: TaskItemProps) {
    const [pending, setPending] = useState(false);

    const handleComplete = () => {
        setPending(true);
        // На успехе задача исчезает из списка и этот TaskItem размонтируется —
        // сбрасывать pending уже незачем, но при ошибке кнопку надо вернуть.
        Promise.resolve(completeTask(task.id)).finally(() => setPending(false));
    };

    return (
        <Card className="flex-row items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-2">
                <span className="min-w-0 truncate">{task.text}</span>
                {authorName && (
                    <Chip size="sm" className="shrink-0">
                        от {authorName}
                    </Chip>
                )}
            </div>
            <Button
                size="sm"
                className="shrink-0"
                isDisabled={pending}
                onPress={handleComplete}
            >
                Выполнить
            </Button>
        </Card>
    );
}

export default function TasksList({
    tasks,
    users,
    meId,
    completeTask,
}: TasksListProps) {
    if (tasks.length === 0) {
        return (
            <p className="py-6 text-center text-sm text-foreground/60">
                Невыполненных задач нет.
            </p>
        );
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {tasks.map((task) => {
                // Показываем автора, только если задачу поставил не ты.
                const authorName =
                    task.authorId === meId
                        ? null
                        : (users.find((u) => u.telegramId === task.authorId)
                              ?.name ?? null);
                return (
                    <TaskItem
                        key={task.id}
                        task={task}
                        authorName={authorName}
                        completeTask={completeTask}
                    />
                );
            })}
        </div>
    );
}
