"use client";
import { Alert, CloseButton } from "@heroui/react";

interface ErrorAlertProps {
    message: string;
    onClose: () => void;
}

export default function ErrorAlert({ message, onClose }: ErrorAlertProps) {
    return (
        <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
                <Alert.Title>Что-то пошло не так</Alert.Title>
                <Alert.Description>{message}</Alert.Description>
            </Alert.Content>
            <CloseButton aria-label="Закрыть" onPress={onClose} />
        </Alert>
    );
}
