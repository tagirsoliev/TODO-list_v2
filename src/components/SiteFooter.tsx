import { Link, Separator, Typography } from "@heroui/react";

export default function SiteFooter() {
    return (
        <footer className="mt-auto border-t border-border">
            <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
                <Typography.Paragraph size="sm" className="text-muted">
                    © {new Date().getFullYear()} Todo-list
                </Typography.Paragraph>

                <div className="flex items-center gap-3">
                    <Link
                        href="https://nextjs.org"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted"
                    >
                        Next.js
                    </Link>
                    <Separator orientation="vertical" className="h-4" />
                    <Link
                        href="https://www.heroui.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-muted"
                    >
                        HeroUI
                    </Link>
                </div>
            </div>
        </footer>
    );
}
