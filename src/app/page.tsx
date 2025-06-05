import FeaturesClient from "@/components/FeaturesClient";
import HeroClient from "@/components/HeroClient";
import NumaClient from "@/components/NumaClient";

const HomePage = () => {
    return (
        <div className="w-full bg-grayBackground overflow-x-hidden">
            <section id="hero" className="w-full min-h-[calc(100vh-80px-0px)] bg-[url('/backgrounds/Hero.jpg')] bg-cover bg-bottom flex place-items-center place-content-center">
                <HeroClient />
            </section>
            <section id="numa" className="w-full min-h-[calc(100vh-80px)] flex place-items-center place-content-center">
                <NumaClient />
            </section>
            <section id="funcionalidades" className="w-full min-h-[calc(100vh-80px)] flex place-content-center">
                <FeaturesClient />
            </section>
        </div>
    );
};

export default HomePage;
