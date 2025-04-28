const Footer = () => {
    return (
        <div className="relative not-odd:bg-emerald-500 w-full h-[70px] flex px-[10px] place-items-center">
            <h2 className="text-white text-4xl font-semibold">Numa</h2>
            <span className="absolute bottom-1 right-2 text-neutral-100 text-[10px]">
                © 2025 Numa. Todos los derechos reservados.
            </span>
        </div>
    );
};

export default Footer;
