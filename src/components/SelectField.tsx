"use client";
import { ListBox, Select } from "@heroui/react";
import type { SelectOption } from "@/types/types";

interface SelectFieldProps {
    items: SelectOption[];
    value: string;
    onChange: (key: string) => void;
    className?: string;
    "aria-label"?: string;
}

export default function SelectField({
    items,
    value,
    onChange,
    className,
    "aria-label": ariaLabel,
}: SelectFieldProps) {
    return (
        <Select
            aria-label={ariaLabel}
            className={className}
            value={value}
            onChange={(key) => onChange(String(key))}
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