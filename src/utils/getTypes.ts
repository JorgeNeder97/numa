import { fetchToGet } from "./general/fetch";

export async function getTypes() {
    return fetchToGet("/api/auth/types");
};