import { Card, ProgressBar } from "@heroui/react";
import type { formType } from "@/app/types/types";

interface TasksStatsProps {
    tasks: formType[];
}

export default function TasksStats({ tasks }: TasksStatsProps) {
    const total = tasks.length;
    const done = tasks.filter((task) => task.isDone === true).length;

    return (
        <Card>
            <Card.Header>
                <Card.Title>Прогресс</Card.Title>
                <Card.Description>
                    Выполнено {done} из {total}
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <ProgressBar
                    aria-label="Прогресс выполнения задач"
                    value={done}
                    minValue={0}
                    maxValue={total || 1}
                >
                    <ProgressBar.Track>
                        <ProgressBar.Fill />
                    </ProgressBar.Track>
                </ProgressBar>
            </Card.Content>
        </Card>
    );
}
