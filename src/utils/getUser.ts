export async function getUser(id: number) {
    try {
        const res = await fetch("/api/auth/register", {
            method: "GET",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!res.ok || res.status !== 200) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
};