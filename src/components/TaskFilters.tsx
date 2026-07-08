"use client";
import SelectField from "./SelectField";
import { FILTER_OPTIONS, TYPE_FILTER_OPTIONS } from "@/constants/constants";

interface TaskFiltersProps {
    filter: string;
    type: string;
    onFilterChange: (value: string) => void;
    onTypeChange: (value: string) => void;
}

export default function TaskFilters({
    filter,
    type,
    onFilterChange,
    onTypeChange,
}: TaskFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <SelectField
                aria-label="Фильтр по статусу"
                className="sm:flex-1"
                items={FILTER_OPTIONS}
                selectedKey={filter}
                onChange={onFilterChange}
            />
            <SelectField
                aria-label="Фильтр по типу"
                className="sm:flex-1"
                items={TYPE_FILTER_OPTIONS}
                selectedKey={type}
                onChange={onTypeChange}
            />
        </div>
    );
}