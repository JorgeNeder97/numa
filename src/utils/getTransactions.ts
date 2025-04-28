import { fetchToGet } from "./general/fetch";

export async function getTransactions() {
    return fetchToGet("/api/auth/transactions");
};

export async function getTransactionsWithCategory() {
    return fetchToGet("/api/auth/transactions/transactionsWithCategory");
}