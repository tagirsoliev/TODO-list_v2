import { Button, Card } from "@heroui/react";
import type { Task } from "@/types/types";

interface TasksListProps {
    tasks: Task[];
    completeTask: (id: number) => void;
}

interface TaskItemProps {
    task: Task;
    completeTask: (id: number) => void;
}

function TaskItem({ task, completeTask }: TaskItemProps) {
    return (
        <Card className="flex-row items-center justify-between gap-4 p-4">
            <span className="min-w-0 truncate">{task.text}</span>
            <Button
                size="sm"
                className="shrink-0"
                onPress={() => completeTask(task.id)}
            >
                Выполнить
            </Button>
        </Card>
    );
}

export default function TasksList({ tasks, completeTask }: TasksListProps) {
    if (tasks.length === 0) {
        return (
            <p className="py-6 text-center text-sm text-foreground/60">
                Невыполненных задач нет.
            </p>
        );
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    completeTask={completeTask}
                />
            ))}
        </div>
    );
}
