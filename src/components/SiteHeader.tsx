import { Header, Typography } from "@heroui/react";
import ThemeSwitch from "./ThemeSwitch";
import TelegramLogin from "./TelegramLogin";

export default function SiteHeader() {
    return (
        <Header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground">
                        ✓
                    </span>
                    <Typography.Heading
                        level={1}
                        className="text-base font-semibold"
                    >
                        Список дел
                    </Typography.Heading>
                </div>

                <div className="flex items-center gap-3">
                    <ThemeSwitch />
                    <TelegramLogin />
                </div>
            </div>
        </Header>
    );
}
