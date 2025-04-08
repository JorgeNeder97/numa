const DashboardPage = async () => {

    // El fetch a este tipo de rutas no funciona aqui, hay que averiguar por que aqui no funciona
    // pero en el register si.
    const res = await fetch("/api/auth/transactions");
    console.log(res);
    
    return (
        <div>
            <p>Dashboard Page</p>
            <p>Monto: {}</p>
        </div>
    );
};

export default DashboardPage;