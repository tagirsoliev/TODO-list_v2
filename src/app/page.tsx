"use client";
import React, { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { formType } from "./types/types";
import TasksStats from "./components/TasksStats";
import TasksList from "./components/TasksList";

export const formInitial: formType = {
    value: "",
    type: "",
    isDone: false,
};

export default function Home() {
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [form, setForm] = useState<formType>(formInitial);
    const [filter, setFilter] = useState<string>("");
    const [type, setType] = useState<string>("");
    // const debounce = useDebounce(value, 1000)

    const clearTasksList = () => {
        setTasks([]);
    };

    const addTask = () => {
        if (form.value !== "") {
            setTasks((prev) => [...prev, { ...form, id: Date.now() }]);
            setForm(formInitial);
        }
    };

    const onChange = (
        e:
            | React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>
            | React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value.trim() }));
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const changeStatus = (id: number) => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === id) {
                    return { ...task, isDone: !task.isDone };
                }
                return task;
            }),
        );
    };

    return (
        <div className="">
            <main className="">
                <TasksStats tasks={tasks} />

                <select
                    name="filterSelect"
                    id="filterSelect"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="none" defaultChecked>
                        Нет фильтра
                    </option>
                    <option value="completed">Только выполненные</option>
                    <option value="uncompleted">Только невыполненные</option>
                </select>

                <select
                    name="typeTasks"
                    id="typeTasks"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                >
                    <option value="" defaultChecked>
                        Все
                    </option>
                    <option value="work">Работа</option>
                    <option value="study">Учёба</option>
                    <option value="personal">Личное</option>
                </select>
                <div>
                    <input
                        type="text"
                        placeholder="Введите дело"
                        name="value"
                        value={form.value}
                        onChange={onChange}
                    />

                    <select name="type" id="type" onChange={onChange}>
                        <option value="" defaultChecked>
                            Без типа
                        </option>
                        <option value="work">Работа</option>
                        <option value="study">Учёба</option>
                        <option value="personal">Личное</option>
                    </select>

                    <button type="button" onClick={addTask}>
                        Добавить
                    </button>
                    <button type="button" onClick={clearTasksList}>
                        Очистить
                    </button>

                    <TasksList
                        tasks={tasks}
                        filter={filter}
                        type={type}
                        deleteTask={deleteTask}
                        changeStatus={changeStatus}
                    />
                </div>
            </main>
        </div>
    );
}
