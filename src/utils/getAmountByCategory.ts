import { fetchToGet } from "./fetch";

export async function getExpensesAmount() {
    return fetchToGet("/api/auth/transactions/amountExpenses");
};

export async function getIncomesAmount() {
    return fetchToGet("/api/auth/transactions/amountIncomes");
};