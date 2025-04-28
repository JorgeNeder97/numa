export async function fetchToGet(route: string) {
    try {
        const res = await fetch(route);

        if(!res.ok || res.status !== 200) throw new Error("algo salió mal... al parecer la variable 'res' es undefined o null");

        const data = await res.json();

        return data;
    } catch (error) {
        if (error instanceof Error) throw new Error("Error: " + error.message);
        console.log(error);
    };
}