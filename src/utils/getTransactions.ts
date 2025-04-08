export async function getTransactions() {
    try {
        const res = await fetch("/api/auth/transactions");

        if (!res || !res.ok) throw new Error("Algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};