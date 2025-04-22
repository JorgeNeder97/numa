import { useEffect, useState } from "react";
import { getCategories } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [categoriesError, setCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                setCategoriesError("No se puedieron obtener las categorías.");
                console.log(error);                
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loadingCategories, categoriesError };
};