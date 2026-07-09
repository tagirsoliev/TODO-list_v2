import { TaskDraft, SelectOption } from "@/app/types/types";

export const DEFAULT_TASK: TaskDraft = {
    value: "",
    type: "",
    isDone: false,
};

export const FILTER_OPTIONS: SelectOption[] = [
    { id: "", name: "Нет фильтра" },
    { id: "completed", name: "Только выполненные" },
    { id: "uncompleted", name: "Только невыполненные" },
];

export const TYPE_FILTER_OPTIONS: SelectOption[] = [
    { id: "", name: "Все" },
    { id: "work", name: "Работа" },
    { id: "study", name: "Учёба" },
    { id: "personal", name: "Личное" },
];

export const TASK_TYPE_OPTIONS: SelectOption[] = [
    { id: "", name: "Без типа" },
    { id: "work", name: "Работа" },
    { id: "study", name: "Учёба" },
    { id: "personal", name: "Личное" },
];