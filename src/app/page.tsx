"use client";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { formType } from "./types/types";
import TasksStats from "@/components/TasksStats";
import TaskForm from "@/components/TaskForm";
import TaskFilters from "@/components/TaskFilters";
import TasksList from "@/components/TasksList";
import ClearTasksButton from "@/components/ClearTasksButton";

export default function Home() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [filter, setFilter] = useState<string>("none");
    const [type, setType] = useState<string>("all");

    const addTask = (task: formType) => {
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
        // TODO: Move components and add the ability to reuse them
        //TODO: Write comments
        <main className="flex flex-col gap-6">
            <TasksStats tasks={tasks} />
            <TaskForm onAdd={addTask} />
            <TaskFilters
                filter={filter}
                type={type}
                onFilterChange={setFilter}
                onTypeChange={setType}
            />
            <TasksList
                tasks={tasks}
                filter={filter}
                type={type}
                deleteTask={deleteTask}
                changeStatus={changeStatus}
            />
            <ClearTasksButton onClear={clearTasks} />
        </main>
    );
}
