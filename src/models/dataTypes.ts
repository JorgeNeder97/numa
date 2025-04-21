export interface Transaction {
    id: number,
    amount: number,
    categoryId: number,
    typeId: number,
    description: string,
    date: string,
    userId: number,
};

export interface Category {
    id: number,
    name: string,
    userId: number,
    typeId: number,
};

export interface CategoryParams {
    params: Promise<{ id: number }>,
};

export interface Types {
    id: number,
    name: string,
}