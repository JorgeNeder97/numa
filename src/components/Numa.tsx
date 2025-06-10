const Numa = () => {

    return (
        <div className="w-full text-primary flex flex-col place-items-center place-content-center gap-[30vh] translate-y-[-10vh]">
            <div className="text-[1.125rem] flex flex-col place-content-center place-items-center gap-[5px]">
                <p className="fromLeft text-center">Usá los datos para tomar mejores decisiones</p>
                <div className="fromCenter w-[200px] border-b-2 pt-[1px] border-primary"></div>
                <p className="fromRight text-center">Cuidar tu bolsillo es cuidar tu bienestar</p>
            </div>
            <div className="flex flex-col place-items-center place-content-center gap-[40px]">
                <h2 className="fadeIn text-[3rem] font-bold">Numa</h2>
                <span className="fadeIn text-[1rem] font-semibold">Invertí en vos</span>
            </div>
        </div>
    );
};

export default Numa;