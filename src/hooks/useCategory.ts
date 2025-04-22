import { useEffect, useState } from "react";
import { getCategory } from "@/utils/getCategories";
import { Category } from "@/models/dataTypes";

export const useCategory = (id: number) => {
    const [category, setCategory] = useState<Category>();
    const [loadingCategory, setLoadingCategory] = useState<boolean>(true);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await getCategory(id);
                setCategory(data);
            } catch (error) {
                setCategoryError("No se puedo obtener la categoría.");
                console.log(error);                
            } finally {
                setLoadingCategory(false);
            }
        };

        fetchCategory();
    }, []);

    return { category, loadingCategory, categoryError };
};