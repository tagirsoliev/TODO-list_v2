export interface Task {
    id: number;
    text: string;
    ownerId: number;
    authorId: number;
    isDone: boolean;
    createdAt: string;
}

export interface User {
    telegramId: number;
    name: string;
    isAdmin: boolean;
}

export interface Auth {
    token: string;
    user: User;
}

export interface SelectOption {
    id: string;
    name: string;
}
