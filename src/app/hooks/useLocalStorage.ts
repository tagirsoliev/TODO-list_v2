"use client";
import { useEffect } from "react";
import { useState } from "react";
import { formType } from "../types/types";

export default function useLocalStorage(
    name: string,
    defValue: formType[],
): [formType[], React.Dispatch<React.SetStateAction<formType[]>>] {
    function getInitValue() {
        const savedList = localStorage.getItem(name);
        savedList ? console.log(1) : console.log(0)
        
        console.log(savedList);
        return savedList ? (JSON.parse(savedList) as formType[]) : null;
    }

    const [list, setList] = useState<formType[]>(
        () => getInitValue() || defValue,
    );

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(list));
    }, [list, name]);

    return [list, setList];
}
