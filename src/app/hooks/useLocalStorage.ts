"use client";
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useState } from "react";
import { formType } from "../types/types";

export default function useLocalStorage(
    name: string,
    defValue: formType[],
): [formType[], React.Dispatch<React.SetStateAction<formType[]>>] {
    const [list, setList] = useState<formType[]>(defValue);

    const subscribe = (callback: () => void) => {
        window.addEventListener("storage", callback);
        return () => window.removeEventListener("storage", callback);
    };

    const getSnapshot = (): string | null => {
        return localStorage.getItem(name);
    };

    const getServerSnapshot = (): string => {
        return JSON.stringify(defValue);
    };

    const storageList = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot,
    );
    //TODO: figure out how to interact with localStorage normally
    const tasks = useMemo(() => {
        return storageList ? JSON.parse(storageList) : defValue;
    }, [storageList]);

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(list));
    }, [list, name]);

    return [list, setList];
}
