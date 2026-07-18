"use client";
import { useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import SelectField from "@/components/SelectField";
import type { SelectOption, User } from "@/types/types";

interface TaskFormProps {
    users: User[];
    meId: number;
    onAdd: (text: string, ownerTelegramId?: number) => Promise<boolean>;
}

export default function TaskForm({ users, meId, onAdd }: TaskFormProps) {
    const [text, setText] = useState<string>("");
    const [owner, setOwner] = useState<string>("");
    const [pending, setPending] = useState(false);

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
        if (trimmed === "" || pending) return;
        setPending(true);
        onAdd(trimmed, owner === "" ? undefined : Number(owner))
            .then((ok) => {
                // Чистим форму только если задача действительно создана.
                if (ok) {
                    setText("");
                    setOwner("");
                }
            })
            .finally(() => setPending(false));
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title>Новая задача</Card.Title>
            </Card.Header>
            <Card.Content>
                <form
                    className="flex flex-col gap-3 sm:flex-row"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAdd();
                    }}
                >
                    <Input
                        className="sm:flex-1"
                        placeholder="Введите дело"
                        value={text}
                        maxLength={2000}
                        disabled={pending}
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
                    <Button type="submit" isDisabled={pending}>
                        Добавить
                    </Button>
                </form>
            </Card.Content>
        </Card>
    );
}
