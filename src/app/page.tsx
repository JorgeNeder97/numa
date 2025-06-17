import DesignFeatures from "@/components/DesignFeatures";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import LastCTA from "@/components/LastCTA";
import Numa from "@/components/Numa";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import Testimonios from "@/components/Testimonios";

const HomePage = () => {
    return (
        <div className="w-full bg-grayBackground overflow-x-hidden">
            
            {/* Ejecuta el hook de scroll reveal */}
            <ScrollRevealClient />
            
            <section id="hero" className="w-full min-h-[calc(100vh-80px-0px)] lg:min-h-[calc(100vh-50px)] bg-[url('/backgrounds/Hero.webp')] bg-cover bg-bottom lg:bg-center flex place-items-center place-content-center">
                <Hero />
            </section>
            
            <section id="numa" className="w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)] flex place-items-center place-content-center">
                <Numa />
            </section>
            
            <section id="funcionalidades" className="w-full scroll-mt-[80px] lg:min-h-[calc(100vh-50px)] pb-[10vh] md:pb-[15vh] flex place-content-center">
                <Features />
            </section>
            
            <section id="diseño" className="w-full pb-[10vh] md:pb-[15vh] min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)]">
                <DesignFeatures />
            </section>
            
            <section id="testimonios" className="w-full pb-[8vh] md:pb-[13vh]">
                <Testimonios />
            </section>
            
            <section id="lastCTA" className="w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)] bg-[url('/backgrounds/LastCTA.jpg')] bg-cover bg-bottom flex place-items-center place-content-center">
                <LastCTA />
            </section>
        </div>
    );
};

export default HomePage;