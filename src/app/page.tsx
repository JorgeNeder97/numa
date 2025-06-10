import DesignFeatures from "@/components/DesignFeatures";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Numa from "@/components/Numa";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import Testimonios from "@/components/Testimonios";

const HomePage = () => {
    return (
        <div className="w-full bg-grayBackground overflow-x-hidden">
            {/* Ejecuta el hook de scroll reveal */}
            <ScrollRevealClient />
            <section id="hero" className="w-full min-h-[calc(100vh-80px-0px)] bg-[url('/backgrounds/Hero.jpg')] bg-cover bg-bottom flex place-items-center place-content-center">
                <Hero />
            </section>
            <section id="numa" className="w-full min-h-[calc(100vh-80px)] flex place-items-center place-content-center">
                <Numa />
            </section>
            <section id="funcionalidades" className="w-full scroll-mt-[80px] pb-[10vh] flex place-content-center">
                <Features />
            </section>
            <section id="diseño" className="w-full pb-[10vh] min-h-[calc(100vh-80px)]">
                <DesignFeatures />
            </section>
            <section id="testimonios" className="w-full pb-[5vh]">
                <Testimonios />
            </section>
        </div>
    );
};

export default HomePage;