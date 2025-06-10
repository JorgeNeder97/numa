import { ReactNode } from "react";

export interface Transaction {
    id: number;
    amount: number;
    categoryId: number;
    typeId: number;
    description: string;
    date: string;
    userId: number;
};

export interface TransactionCategory extends Transaction {
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    userId: number;
    typeId: number;
};

export interface CategoryParams {
    params: Promise<{ id: number }>;
};

export interface Types {
    id: number;
    name: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    exitButton: boolean;
    style: "Success" | "Warning" | "Error" | "Black";
}

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    transactions?: Transaction[];
    categories?: Category[];
}

export interface Testimonio {
    nombre: string;
    rol: string;
    texto: string;
    estrellas: number;
    img: string;
};