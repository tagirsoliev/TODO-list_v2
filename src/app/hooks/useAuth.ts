import { AuthContext } from '@/app/components/AuthProvider';
import { useContext } from "react";

export default function useAuth() {
    //сужение типа, чтобы не было null 
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth должен быть внутри AuthProvider')
    return ctx
}
