"use client";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { TaskDraft } from "../types/types";
import TasksStats from "@/components/TasksStats";
import TaskForm from "@/components/TaskForm";
import SelectField from "@/components/SelectField";
import TasksList from "@/components/TasksList";
import { Button } from "@heroui/react";
import { FILTER_OPTIONS, TYPE_FILTER_OPTIONS } from "@/constants/constants";

export default function Home() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filter, setFilter] = useState<string>("");
    const [type, setType] = useState<string>("");

    const addTask = (task: TaskDraft) => {
        setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
    };

    const clearTasks = () => {
        setTasks([]);
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const changeStatus = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isDone: !task.isDone } : task,
            ),
        );
    };

    return (
        <main className="flex flex-col gap-6">
            <TasksStats tasks={tasks} />

            <TaskForm onAdd={addTask} />

            <div className="flex flex-col gap-3 sm:flex-row">
                {/* Filters */}
                <SelectField
                    aria-label="Фильтр по статусу"
                    className="sm:flex-1"
                    items={FILTER_OPTIONS}
                    value={filter}
                    onChange={setFilter}
                />

                <SelectField
                    aria-label="Фильтр по типу"
                    className="sm:flex-1"
                    items={TYPE_FILTER_OPTIONS}
                    value={type}
                    onChange={setType}
                />
            </div>

            <TasksList
                tasks={tasks}
                filter={filter}
                type={type}
                deleteTask={deleteTask}
                changeStatus={changeStatus}
            />

            <Button variant="outline" onPress={clearTasks}>
                Очистить всё
            </Button>
        </main>
    );
}
