"use client";

import { Moon, Sun } from "@gravity-ui/icons";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function ThemeSwitch() {
    const { resolvedTheme, setTheme } = useTheme();
    
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

    if (!isMounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <Switch
            size="lg"
            isSelected={isDark}
            onChange={(selected) => setTheme(selected ? "dark" : "light")}
        >
            <Switch.Content>
                <Switch.Control>
                    <Switch.Thumb>
                        <Switch.Icon>
                            {isDark ? (
                                <Moon className="size-3 text-inherit" />
                            ) : (
                                <Sun className="size-3 text-inherit" />
                            )}
                        </Switch.Icon>
                    </Switch.Thumb>
                </Switch.Control>
            </Switch.Content>
        </Switch>
    );
}
