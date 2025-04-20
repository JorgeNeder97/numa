export async function getCategories() {
    try {
        const res = await fetch("/api/auth/categories");

        if (!res || !res.ok) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};

export async function getCategory(id: number) {
    try {
        const res = await fetch(`/api/auth/categories/${id}`)

        if (!res || !res.ok) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};

export async function getIncomeCategories() {
    try {
        const res = await fetch("/api/auth/categories/income");

        if (!res || !res.ok) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};

export async function getExpenseCategories() {
    try {
        const res = await fetch("/api/auth/categories/expense");

        if (!res || !res.ok) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};