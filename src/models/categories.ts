export interface Category {
    id: number,
    name: string,
    userId: number,
};

export interface CategoryParams {
    params: Promise<{ id: number }>,
};