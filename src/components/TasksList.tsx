import { Button, Card } from "@heroui/react";
import type { Task } from "@/types/types";

interface TasksListProps {
    tasks: Task[];
    meId: number;
    completeTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

interface TaskItemProps {
    task: Task;
    meId: number;
    completeTask: (id: number) => void;
    deleteTask: (id: number) => void;
}

function TaskItem({ task, meId, completeTask, deleteTask }: TaskItemProps) {
    return (
        <Card className="flex-row items-center justify-between gap-4 p-4">
            <span className="min-w-0 truncate">{task.text}</span>
            <div className="flex shrink-0 gap-2">
                <Button size="sm" onPress={() => completeTask(task.id)}>
                    Выполнить
                </Button>
                {/* DELETE разрешён только автору — чужая задача дала бы 404. */}
                {task.authorId === meId && (
                    <Button
                        size="sm"
                        variant="danger-soft"
                        onPress={() => deleteTask(task.id)}
                    >
                        Удалить
                    </Button>
                )}
            </div>
        </Card>
    );
}

export default function TasksList({
    tasks,
    meId,
    completeTask,
    deleteTask,
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
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    meId={meId}
                    completeTask={completeTask}
                    deleteTask={deleteTask}
                />
            ))}
        </div>
    );
}
