"use client";
import { useState } from "react";
import { Button, Card, Input } from "@heroui/react";
import SelectField from "./SelectField";
import { DEFAULT_TASK, TASK_TYPE_OPTIONS } from "@/constants/constants";
import type { formType } from "@/app/types/types";

interface TaskFormProps {
    onAdd: (task: formType) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [form, setForm] = useState<formType>(DEFAULT_TASK);

    const handleAdd = () => {
        if (form.value.trim() === "") return;
        onAdd(form);
        setForm(DEFAULT_TASK);
    };

    return (
        <Card>
            <Card.Header>
                <Card.Title>Новая задача</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3">
                <Input
                    placeholder="Введите дело"
                    value={form.value}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, value: e.target.value }))
                    }
                />
                <div className="flex flex-col gap-3 sm:flex-row">
                    <SelectField
                        aria-label="Тип задачи"
                        className="sm:flex-1"
                        items={TASK_TYPE_OPTIONS}
                        selectedKey={form.type === "" ? "none" : form.type}
                        onChange={(key) =>
                            setForm((prev) => ({
                                ...prev,
                                type: key === "none" ? "" : key,
                            }))
                        }
                    />
                    <Button onPress={handleAdd} className="sm:flex-1">
                        Добавить
                    </Button>
                </div>
            </Card.Content>
        </Card>
    );
}