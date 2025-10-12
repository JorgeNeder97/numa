import { useEffect, useState } from "react";
import { getGenres } from "@/utils/getGenres";
import { Genres } from "@/models/dataTypes";

export const useGenres = () => {
    const [genres, setGenres] = useState<Genres[]>([]);
    const [loadingGenres, setLoadingGenres] = useState<boolean>(true);
    const [genresError, setGenresError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                setGenresError("No se puedieron obtener los géneros.");
                console.log(error);                
            } finally {
                setLoadingGenres(false);
            }
        };

        fetchGenres();
    }, []);

    return { genres, loadingGenres, genresError };
};