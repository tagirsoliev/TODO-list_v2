import { formType, SelectOption } from "@/app/types/types";

export const DEFAULT_TASK: formType = {
    value: "",
    type: "",
    isDone: false,
};

export const FILTER_OPTIONS: SelectOption[] = [
    { id: "none", name: "Нет фильтра" },
    { id: "completed", name: "Только выполненные" },
    { id: "uncompleted", name: "Только невыполненные" },
];

export const TYPE_FILTER_OPTIONS: SelectOption[] = [
    { id: "all", name: "Все" },
    { id: "work", name: "Работа" },
    { id: "study", name: "Учёба" },
    { id: "personal", name: "Личное" },
];

export const TASK_TYPE_OPTIONS: SelectOption[] = [
    { id: "none", name: "Без типа" },
    { id: "work", name: "Работа" },
    { id: "study", name: "Учёба" },
    { id: "personal", name: "Личное" },
];