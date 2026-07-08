"use client";
import { Button } from "@heroui/react";

interface ClearTasksButtonProps {
    onClear: () => void;
}

export default function ClearTasksButton({ onClear }: ClearTasksButtonProps) {
    return (
        <Button variant="outline" onPress={onClear}>
            Очистить всё
        </Button>
    );
}