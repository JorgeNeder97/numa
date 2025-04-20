import { useEffect, useState } from "react";
import { getTypes } from "@/utils/getTypes";
import { Types } from "@/models/dataTypes";

export const useTypes = () => {
    const [types, setTypes] = useState<Types[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await getTypes();
                setTypes(data);
            } catch (error) {
                setError("No se puedieron obtener los tipos.");
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    return { types, loading, error };
};