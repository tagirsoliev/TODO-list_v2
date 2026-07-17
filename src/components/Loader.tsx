"use client";
import { Spinner } from "@heroui/react";

export default function Loader() {
    return (
        <div className="flex justify-center py-10">
            <Spinner aria-label="Загрузка задач" />
        </div>
    );
}
