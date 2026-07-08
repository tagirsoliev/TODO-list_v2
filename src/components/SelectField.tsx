"use client";
import { ListBox, Select } from "@heroui/react";
import type { SelectOption } from "@/app/types/types";

interface SelectFieldProps {
    items: SelectOption[];
    selectedKey: string;
    onChange: (key: string) => void;
    className?: string;
    "aria-label"?: string;
}

export default function SelectField({
    items,
    selectedKey,
    onChange,
    className,
    "aria-label": ariaLabel,
}: SelectFieldProps) {
    return (
        <Select
            aria-label={ariaLabel}
            className={className}
            selectedKey={selectedKey}
            onSelectionChange={(key) => onChange(String(key))}
        >
            <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
                <ListBox items={items}>
                    {(item) => (
                        <ListBox.Item id={item.id} textValue={item.name}>
                            {item.name}
                        </ListBox.Item>
                    )}
                </ListBox>
            </Select.Popover>
        </Select>
    );
}