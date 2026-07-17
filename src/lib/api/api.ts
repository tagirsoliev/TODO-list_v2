// Nest отдаёт message строкой у ручных ошибок и массивом строк у валидации.
async function readErrorMessage(res: Response): Promise<string> {
    const fallback = `Ошибка ${res.status}`;
    try {
        const data = await res.json();
        if (Array.isArray(data?.message)) return data.message.join(", ");
        if (typeof data?.message === "string") return data.message;
        return fallback;
    } catch {
        return fallback;
    }
}

export default async function api(
    endpoint: string,
    method: string,
    headers?: object,
    body?: object,
) {
    const res = await fetch(
        `https://todo-backend-sigma-five.vercel.app/api${endpoint}`,
        {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...(method.toLowerCase() !== "get" &&
                method.toLowerCase() !== "head" && {
                    body: JSON.stringify(body),
                }),
        },
    );
    if (!res.ok) {
        throw new Error(await readErrorMessage(res));
    }
    // DELETE отвечает 204 без тела — res.json() на нём упадёт.
    if (res.status === 204) {
        return null;
    }
    const data = await res.json();
    return data;
}
