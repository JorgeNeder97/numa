import DesignFeatures from "@/components/DesignFeatures";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import LastCTA from "@/components/LastCTA";
import Numa from "@/components/Numa";
import ScrollRevealClient from "@/components/ScrollRevealClient";
import Testimonios from "@/components/Testimonios";

const HomePage = () => {
    return (
        <div className="w-full bg-[url('/backgrounds/Hero.png')] bg-cover bg-bottom lg:bg-center bg-fixed overflow-x-hidden">
            
            {/* Ejecuta el hook de scroll reveal */}
            <ScrollRevealClient />
            
            <section id="hero" className="w-full min-h-[calc(100vh-80px-0px)] lg:min-h-[calc(100vh)] flex pt-[80px] sm:pt-0 sm:place-items-center place-content-center">
                <Hero />
            </section>
            
            <section id="numa" className="bg-gradient-to-b from-almostwhite via-gray-300 to-almostwhite w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)] flex place-items-center place-content-center">
                <Numa />
            </section>
            
            <section id="funcionalidades" className="bg-gradient-to-b from-almostwhite via-gray-300 to-almostwhite w-full scroll-mt-[80px] lg:min-h-[calc(100vh-50px)] pb-[10vh] md:pb-[15vh] flex place-content-center">
                <Features />
            </section>
            
            <section id="diseño" className="bg-gradient-to-b from-almostwhite via-gray-300 to-almostwhite w-full pb-[10vh] md:pb-[15vh] min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)]">
                <DesignFeatures />
            </section>
            
            <section id="testimonios" className="bg-gradient-to-b from-almostwhite via-gray-300 to-almostwhite w-full pb-[8vh] md:pb-[13vh]">
                <Testimonios />
            </section>
            
            <section id="lastCTA" className="bg-gradient-to-b from-almostwhite via-gray-300 to-almostwhite w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-50px)] flex place-items-center place-content-center">
                <LastCTA />
            </section>
        </div>
    );
};

export default HomePage;