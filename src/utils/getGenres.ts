import { fetchToGet } from "./general/fetch";

export async function getGenres() {
    return fetchToGet("/api/genres");
};