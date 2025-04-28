import { fetchToGet } from "./general/fetch";

export async function getCategories() {
    return fetchToGet("/api/auth/categories");
};

export async function getCategory(id: number) {
    return fetchToGet(`/api/auth/categories/${id}`);
};

export async function getIncomeCategories() {
    fetchToGet("/api/auth/categories/income");
};

export async function getExpenseCategories() {
    fetchToGet("/api/auth/categories/expense");
};