import Hero from "@/components/Hero";

const HomePage = () => {
    return (
        <div className="w-full">
            <section className="w-full min-h-[calc(100dvh-80px-0px)] bg-[url('/backgrounds/Hero.jpg')] bg-cover bg-bottom flex place-items-center place-content-center">
                <Hero />
            </section>
        </div>
    );
};

export default HomePage;
