import { Button, Card, Chip } from "@heroui/react";
import type { Task } from "@/app/types/types";

const typeLabels: Record<string, string> = {
    work: "Работа",
    study: "Учёба",
    personal: "Личное",
};

interface TasksListProps {
    tasks: Task[];
    filter: string;
    type: string;
    deleteTask: (id: number) => void;
    changeStatus: (id: number) => void;
}

interface TaskItemProps {
    id: number;
    value: string;
    type: string;
    isDone: boolean;
    deleteTask: (id: number) => void;
    changeStatus: (id: number) => void;
}

function TaskItem({ id, value, type, isDone, deleteTask, changeStatus }: TaskItemProps) {
    return (
        <Card className="flex-row items-center justify-between gap-4 p-4">
            <div className="flex min-w-0 items-center gap-3">
                <span
                    className={
                        isDone
                            ? "truncate text-foreground/50 line-through"
                            : "truncate"
                    }
                >
                    {value}
                </span>
                {type && (
                    <Chip size="sm" color="accent" className="shrink-0">
                        {typeLabels[type] ?? type}
                    </Chip>
                )}
            </div>
            <div className="flex shrink-0 gap-2">
                <Button
                    size="sm"
                    variant={isDone ? "secondary" : "primary"}
                    onPress={() => changeStatus(id)}
                >
                    {isDone ? "Выполнено" : "Выполнить"}
                </Button>
                <Button
                    size="sm"
                    variant="danger-soft"
                    onPress={() => deleteTask(id)}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    );
}

export default function TasksList({ tasks, filter, type, deleteTask, changeStatus }: TasksListProps) {
    const filteredTasks =
        filter === "completed"
            ? tasks.filter((task) => task.isDone === true)
            : filter === "uncompleted"
                ? tasks.filter((task) => task.isDone === false)
                : tasks;

    const displayedTasks =
        type === "work" || type === "study" || type === "personal"
            ? filteredTasks.filter((task) => task.type === type)
            : filteredTasks;

    if (displayedTasks.length === 0) {
        return (
            <p className="py-6 text-center text-sm text-foreground/60">
                Нет задач, соответствующих фильтру.
            </p>
        );
    }

    return (
        <div className="flex w-full flex-col gap-3">
            {displayedTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    id={task.id}
                    value={task.value}
                    type={task.type}
                    isDone={task.isDone}
                    deleteTask={deleteTask}
                    changeStatus={changeStatus}
                />
            ))}
        </div>
    );
}
