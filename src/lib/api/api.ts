export default async function api(
    url: string,
    method: string,
    headers?: object,
    body?: object,
) {
    const res = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...(method.toLowerCase() !== "get" &&
            method.toLowerCase() !== "head" && {
                body: JSON.stringify(body),
            }),
    });
    if (!res.ok) {
        throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
}
