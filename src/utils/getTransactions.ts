import { fetchToGet } from "./general/fetch";

export async function getTransactions() {
    return fetchToGet("/api/auth/transactions");
};

export async function getTransactionsWithCategory() {
    return fetchToGet("/api/auth/transactions/transactionsWithCategory");
};

export async function getFewTransactionsWithCategory() {
    return fetchToGet("/api/auth/transactions/transactionsWithCategory/few");
};

export async function getLastExpense() {
    return fetchToGet("/api/auth/transactions/amountExpenses/lastOne");
};

export async function getLastIncome() {
    return fetchToGet("/api/auth/transactions/amountIncomes/lastOne");
};