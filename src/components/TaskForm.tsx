"use client";
import { useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import SelectField from "@/components/SelectField";
import type { SelectOption, User } from "@/types/types";

interface TaskFormProps {
    users: User[];
    meId: number;
    onAdd: (text: string, ownerTelegramId?: number) => void;
}

export default function TaskForm({ users, meId, onAdd }: TaskFormProps) {
    const [text, setText] = useState<string>("");
    const [owner, setOwner] = useState<string>("");

    // "" — себе; иначе telegramId получателя строкой. Себя из списка убираем,
    // вариант «Себе» его уже покрывает.
    const recipientOptions: SelectOption[] = [
        { id: "", name: "Себе" },
        ...users
            .filter((u) => u.telegramId !== meId)
            .map((u) => ({ id: String(u.telegramId), name: u.name })),
    ];

    const handleAdd = () => {
        const trimmed = text.trim();
        if (trimmed === "") return;
        onAdd(trimmed, owner === "" ? undefined : Number(owner));
        setText("");
        setOwner("");
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
                {recipientOptions.length > 1 && (
                    <SelectField
                        aria-label="Кому назначить"
                        items={recipientOptions}
                        value={owner}
                        onChange={setOwner}
                    />
                )}
                <Button onPress={handleAdd}>Добавить</Button>
            </Card.Content>
        </Card>
    );
}
