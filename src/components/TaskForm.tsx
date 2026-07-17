"use client";
import { useState } from "react";
import { Button, Card, Input } from "@heroui/react";

interface TaskFormProps {
    onAdd: (text: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [text, setText] = useState<string>("");

    const handleAdd = () => {
        const trimmed = text.trim();
        if (trimmed === "") return;
        onAdd(trimmed);
        setText("");
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title>Новая задача</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 sm:flex-row">
                <Input
                    className="sm:flex-1"
                    placeholder="Введите дело"
                    value={text}
                    maxLength={2000}
                    onChange={(e) => setText(e.target.value)}
                />
                <Button onPress={handleAdd}>Добавить</Button>
            </Card.Content>
        </Card>
    );
}
