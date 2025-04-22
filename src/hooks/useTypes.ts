import { useEffect, useState } from "react";
import { getTypes } from "@/utils/getTypes";
import { Types } from "@/models/dataTypes";

export const useTypes = () => {
    const [types, setTypes] = useState<Types[]>([]);
    const [loadingTypes, setLoadingTypes] = useState<boolean>(true);
    const [typesError, setTypesError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await getTypes();
                setTypes(data);
            } catch (error) {
                setTypesError("No se puedieron obtener los tipos.");
                console.log(error);                
            } finally {
                setLoadingTypes(false);
            }
        };

        fetchTypes();
    }, []);

    return { types, loadingTypes, typesError };
};